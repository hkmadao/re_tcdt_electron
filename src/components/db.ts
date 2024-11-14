import { TAttribute, TEntity, TExecuteSqlParam, TFindTableParam } from '../conf';
import mysql from 'mysql2'
import log from 'electron-log/main';

type TTable = {
  idTable: string;
  tableName: string;
  idColumn: string;
  columnName: string;
}

const querySql = `SELECT
	t.TABLE_SCHEMA as tableSchema,
	t.TABLE_NAME as idTable,
	t.TABLE_NAME as tableName,
	t.TABLE_COMMENT as tableDisplayName,
	c.COLUMN_NAME as idColumn,
	c.COLUMN_NAME as columnName,
	c.COLUMN_COMMENT as colmunDisplayName
FROM
	TABLES t
LEFT JOIN \`COLUMNS\` c ON
	c.TABLE_NAME = t.TABLE_NAME
	AND c.TABLE_SCHEMA = t.TABLE_SCHEMA
WHERE
	t.TABLE_SCHEMA = ?`;

export const findTableInfos = async (param: TFindTableParam) => {
  const connection = mysql.createConnection({
    host: param.host,
    user: param.user,
    password: param.password,
    port: param.port,
    database: param.database,
  });

  connection.connect();
  const queryReslut = await queryByParam<TTable[]>(connection, querySql, [param.tableSchema]);
  connection.end();

  const keys = new Set<string>();
  //映射结果集
  const entities = queryReslut.map(r => {
    if (!keys.has(r.idTable)) {
      keys.add(r.idTable);
      const e: TEntity = {
        idEntity: r.idTable,
        tableName: r.tableName,
        attributes: [],
      }
      return e;
    }
    return undefined;
  }).filter(e => !!e);
  //映射子级结果
  const result = entities.map(e => {
    const attrs: TAttribute[] = queryReslut.filter(r => r.idTable === e.idEntity).map(r => {
      return {
        idAttribute: r.idColumn,
        columnName: r.columnName,
      }
    })
    const entity: TEntity = {
      ...e,
      attributes: attrs,
    }
    return entity;
  });

  return result;
}

export const excuteDdlSql = async (param: TExecuteSqlParam) => {
  const connection = mysql.createConnection({
    host: param.host,
    user: param.user,
    password: param.password,
    port: param.port,
    database: param.database,
    multipleStatements: true,
  });
  connection.connect();
  const executeSqlResult = await executeSql<any>(connection, param.executeSql);
  log.info(executeSqlResult);
  connection.end();
}

function queryByParam<T>(connection: mysql.Connection, sql: string, param?: any[]) {
  return new Promise<T>((resolve, reject) => {
    connection.query(sql, param, (error, results,) => {
      if (error) reject(error);
      resolve(results as any);
    });
  });
}

function executeSql<T>(connection: mysql.Connection, sql: string,) {
  return new Promise<T>((resolve, reject) => {
    const decodeSql = decodeURIComponent(sql);
    connection.query(decodeSql, (error, results,) => {
      if (error) reject(error);
      resolve(results as any);
    });
  });
}




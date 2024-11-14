/**客户端配置 */
export type TClientConfig = {
  /**是否使用本地前端 */
  fgLocal: boolean;
  /**tcdt地址 */
  tcdtUrl: string;
  /**下载缓存目录 */
  downloadCachePath: string;
}

/**代码目录配置 */
export type TCodeGenerateConfig = {
  id: string;
  name: string;
  fgActive: boolean;
  /**实体组合生成 */
  entityFullPaths: TSubPath[];
  /**实体分散生成 */
  entityPartPaths: TSubPath[];
  /**组合实体组件 */
  componentCombinationPaths: TSubPath[];
  /**单实体组件 */
  componentSinglePaths: TSubPath[];
  /**枚举组件组合生成 */
  componentEnumFullPaths: TSubPath[];
  /**枚举组件分散生成 */
  componentEnumPartPaths: TSubPath[];
  /**DTO 入参组合生成 */
  dtoInputFullPaths: TSubPath[];
  /**DTO 入参分散生成 */
  dtoInputPartPaths: TSubPath[];
  /**DTO 出参组合生成 */
  dtoOutputFullPaths: TSubPath[];
  /**DTO 出参分散生成 */
  dtoOutputPartPaths: TSubPath[];
  /**表单设计 前端生成 */
  uiFactoryPaths: TSubPath[];
}

export type TSubPath = {
  id?: string;
  prefixPath?: string;
  /**源目录 */
  sourceDir?: string;
  /**目的目录 */
  targetDir: string;
}

export type GenerateType = keyof TCodeGenerateConfig;

export type TEntity = {
  idEntity: string;
  tableName: string;
  attributes: TAttribute[];
}

export type TAttribute = {
  idAttribute: string;
  columnName: string;
}

export type TFindTableParam = {
  host: string;
  user: string;
  password: string;
  port: number;
  database: string;
  tableSchema: string;
}

export type TExecuteSqlParam = {
  host: string;
  user: string;
  password: string;
  port: number;
  database: string;
  executeSql: string;
}
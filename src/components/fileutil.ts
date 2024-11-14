import fs from 'fs';
import path, { sep } from 'path';
import log from 'electron-log/main';

/**
 * 将指定src目录下的所有文件剪切到指定目标dest目录下
 * @param src 源目录
 * @param dest 目标目录
 * @param rule 文件分隔符使用“/”, 防止与正则表达式“\”造成混乱
 */
export function copyDirectory(src: string, dest: string, rule?: string,) {
    const isExists = fs.existsSync(src);
    if (!isExists) {
        // eslint-disable-next-line no-console
        log.error("copy file not exists, filename: " + src);
        return;
    }
    const files = fs.readdirSync(src);
    files.forEach((item, index) => {
        const itemPath = path.join(src, item);
        const itemStat = fs.statSync(itemPath);// 获取文件信息
        const savedPath = path.join(dest, itemPath.replace(src, ''));
        const savedDir = savedPath.substring(0, savedPath.lastIndexOf(sep));
        if (itemStat.isFile()) {
            if (rule && rule.trim() !== '') {
                //change sep to / and search
                if (itemPath.replaceAll(sep, '/').search(rule) === -1) {
                    return;
                }
            }
            // 如果目录不存在则进行创建
            if (!fs.existsSync(savedDir)) {
                fs.mkdirSync(savedDir, { recursive: true });
            }
            // 写入到新目录下
            const data = fs.readFileSync(itemPath);
            fs.writeFileSync(savedPath, data);
            // 并且删除原文件
            fs.unlinkSync(itemPath);
        } else if (itemStat.isDirectory()) {
            copyDirectory(itemPath, path.join(savedDir, item), rule);
        }
    });
}

/**
 * 删除指定目录下所有文件和目录
 * @param dir 指定目录
 */
export function delDirectory(dir: string) {
    let files = [];
    if (fs.existsSync(dir)) {
        files = fs.readdirSync(dir);
        files.forEach((file, index) => {
            const curPath = path.join(dir, file);
            const stat = fs.statSync(curPath);
            if (stat.isDirectory()) {
                delDirectory(curPath); //递归删除文件夹
            } else if (stat.isFile()) {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(dir);
    }
}

import { SQLite } from "@ionic-native/sqlite";
import { Pageable } from "../../models/pageable.model";
import { Base } from "../../models/base.model";
import { Page } from "../../models/page.model";

export abstract class BaseSQlite {

    dbConfig: any = {
        name: 'xhop.db',
        location: 'default'
    };

    db: any;

    constructor(
        public sqlite: SQLite) {
    }

    connect(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.db) {
                resolve(this.db);
            } else {
                this.sqlite.create(this.dbConfig).then((db) => {
                    this.db = db;
                    resolve(db);
                }).catch((error) => {
                    console.log('BaseDb -> connect :: ' + JSON.stringify(error));
                    reject(error);
                });
            }
        });
    }

    executeSql(query: string, params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.executeSql(query, params).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    createParams(params: Array<any>, pageable: Pageable) : Array<any>{
        let limit: number = pageable.size;
        let offset: number = (pageable.pageNumber - 1) * pageable.size;
        let orderBy: string = pageable.sort.column + (pageable.sort.isAsc) ? ' ASC' : ' DESC';

        return [...params, ...[orderBy, limit, offset]];
    }

}
import { SQLite } from "@ionic-native/sqlite";

export abstract class BaseDb {

    dbConfig: any = {
        name: 'xhop.db',
        location: 'default'
    };

    db: any;

    constructor(
        public sqlite: SQLite) {
    }

    createDB(): Promise<any> {
        console.log('createDB............');
        return new Promise((resolve, reject) => {
            if (this.db != null || this.db != undefined) {
                resolve(this.db);
            } else {
                this.sqlite.create(this.dbConfig).then((db) => {
                    this.db = db;
                    resolve(db);
                }).catch((error) => {
                    console.log('db : ' + error);
                    console.log('db : ' + JSON.stringify(error));
                    reject(error);
                });
            }
        });
    }

}

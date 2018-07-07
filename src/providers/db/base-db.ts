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

}

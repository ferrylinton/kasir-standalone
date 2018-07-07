import { SQLiteDatabaseConfig } from '@ionic-native/sqlite';

export class SQLiteObject {

  _objectInstance: any;

  constructor(_objectInstance: any) {
    this._objectInstance = _objectInstance;
  };

  executeSql(statement: string, params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._objectInstance.transaction((tx) => {
        tx.executeSql(
          statement,
          params,
          (tx, result) => { resolve(result) },
          (tx, error) => { reject(error.message) }
        );
      });
    });
  };

  transaction(fn: any): Promise<any> {
    return new Promise((resolve, reject) => {
      return this._objectInstance.transaction((tx) => {
         fn(tx);
      }, (error) => {
        reject(error.message);
      }, () => {
        resolve('success');
      });
    });
    
  }

  sqlBatch(statements: string[], params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._objectInstance.transaction((tx) => {
        for (let i = 0; i < statements.length; i++) {
          tx.executeSql(statements[i], [], (tx, result) => {
            resolve(result);
          });
        }
      }, (error) => {
        reject(error.message);
      });
    });
  };
}

export class SQLiteMock {

  public create(config: SQLiteDatabaseConfig): Promise<SQLiteObject> {
    var db = (<any>window).openDatabase(config.name, '', 'mock SQLite with WebSql', 50 * 1024 * 1024);

    return new Promise((resolve, reject) => {
      resolve(new SQLiteObject(db));
    });
  }

}
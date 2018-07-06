import { SQLiteDatabaseConfig } from '@ionic-native/sqlite';

export class SQLiteObject{

    _objectInstance: any;

    constructor(_objectInstance: any){
      this._objectInstance = _objectInstance;
    };

    executeSql(statement: string, params: any): Promise<any>{
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

    transaction(fn: any): Promise<any>{
      return new Promise((resolve, reject) => {
        this._objectInstance.transaction((tx) => {
          fn(tx);
        });

        resolve();
      });
    }

    sqlBatch(statements: string[], params: any): Promise<any>{
      return new Promise((resolve, reject) => {
        this._objectInstance.transaction((tx) => {
          let message: any = null;

          for(let i=0; i<statements.length; i++){

            if(message){
              reject(message);
            }

            console.log('execute : ' + statements[i]);
            tx.executeSql(
              statements[i], 
              params, 
              (tx, result) => { resolve(result) }, 
              (tx, error) => { message = error.message }
            );
          }
        });
      });
    };

}

export class SQLiteMock {

  public create(config: SQLiteDatabaseConfig): Promise<SQLiteObject> {
    var db = (<any> window).openDatabase(config.name, '', 'mock SQLite with WebSql', 2 * 1024 * 1024);

    return new Promise((resolve, reject) => {
      resolve(new SQLiteObject(db));
    });
  }

}
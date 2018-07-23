# xshop
This application was generated using ionic

# Add OpenPGP type def

## Install typings
    ```
    npm install -g --save typings
    ```

## Create file.d.ts
```
    add src/types/openpgp.d.ts 

    ex.
    declare module 'openpgp'{
        export interface UserId ...
        ...
    }
```
## Install fle.d.ts
```
    typings install file:src/types/openpgp.d.ts --save --global
```
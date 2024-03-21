import type { SQLiteDatabase } from "expo-sqlite";

interface CreateTableInput {
  db: SQLiteDatabase;
  tableName: "books" | "highlights";
  fields: { key: string; type: "TEXT" | "INTEGER" }[];
}

interface DropTableInput {
  db: SQLiteDatabase;
  tableName: "books" | "highlights";
}

interface InsertRowInput {
  db: SQLiteDatabase;
  tableName: "books" | "highlights";
  fields: string[];
  values: any[];
}

interface GetAllInput {
  db: SQLiteDatabase;
  tableName: "books" | "highlights";
}

interface GetManyInput extends GetAllInput {
  fieldFilter: string;
  valueFilter: string | number;
}

interface GetOneInput extends GetManyInput {}

export const createTable = ({ db, tableName, fields }: CreateTableInput) => {
  let transactionResult: null | "success" | "error" = null;

  db.transaction((tx) => {
    tx.executeSql(
      `
        CREATE TABLE IF NOT EXISTS ${tableName} (
          ${fields.map(({ key, type }) => `${key} ${type}`).join(", ")}
        );`,
      [],
      () => {
        transactionResult = "success";
      },
      () => {
        transactionResult = "error";
        return false;
      },
    );
  });

  return transactionResult;
};

export const dropTable = ({ db, tableName }: DropTableInput) => {
  let transactionResult: null | "success" | "error" = null;

  db.transaction((tx) => {
    tx.executeSql(
      `DROP TABLE IF EXISTS ${tableName};`,
      [],
      () => {
        transactionResult = "success";
      },
      () => {
        transactionResult = "error";
        return false;
      },
    );
  });

  return transactionResult;
};

export const insertRow = ({ db, tableName, fields, values }: InsertRowInput) => {
  let transactionResult: null | "success" | "error" = null;

  db.transaction((tx) => {
    tx.executeSql(
      `
        INSERT INTO ${tableName} (
          ${fields.join(", ")}
        ) VALUES (${fields.map(() => "?").join(", ")});
      `,
      values,
      () => {
        transactionResult = "success";
      },
      () => {
        transactionResult = "error";
        return false;
      },
    );
  });

  return transactionResult;
};

export const updateRow = ({ db, tableName, fields, values }: InsertRowInput) => {
  let transactionResult: null | "success" | "error" = null;

  db.transaction((tx) => {
    tx.executeSql(
      `
        UPDATE ${tableName} SET
        ${fields.map((field) => `${field} = ?`).join(", ")}
      `,
      values,
      () => {
        transactionResult = "success";
      },
      () => {
        transactionResult = "error";
        return false;
      },
    );
  });

  return transactionResult;
};

export const getAll = <T>({ db, tableName }: GetAllInput) => {
  return new Promise<T[]>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${tableName};`,
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
};

export const getMany = <T>({ db, tableName, fieldFilter, valueFilter }: GetManyInput) => {
  return new Promise<T[]>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${tableName} WHERE ${fieldFilter} = ?;`,
        [valueFilter],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
};

export const getOne = <T>({ db, tableName, fieldFilter, valueFilter }: GetOneInput) => {
  return new Promise<T>((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${tableName} WHERE ${fieldFilter} = ?;`,
        [valueFilter],
        (_, { rows }) => {
          resolve(rows.item(0));
        },
        () => {
          return false;
        },
      );
    });
  });
};

export const deleteRow = ({ db, tableName, fieldFilter, valueFilter }: GetOneInput) => {
  let transactionResult: null | "success" | "error" = null;

  db.transaction((tx) => {
    tx.executeSql(
      `DELETE FROM ${tableName} WHERE ${fieldFilter} = ?;`,
      [valueFilter],
      () => {
        transactionResult = "success";
      },
      () => {
        transactionResult = "error";
        return false;
      },
    );
  });

  return transactionResult;
};

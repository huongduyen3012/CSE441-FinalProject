import Realm from 'realm';

// User schema
class User extends Realm.Object {
    static schema = {
        name: 'User',
        primaryKey: 'userId',
        properties: {
            userId: 'string',
            name: 'string',
            phone: 'string',
            password: 'string',
            createdAt: 'date',
            updatedAt: 'date',
        }
    }
}


// Budget schema
class Budget extends Realm.Object {
    static schema = {
        name: 'Budget',
        primaryKey: 'id',
        properties: {
            id: 'string',
            date: 'date',
            firstAmount: 'float',
            remainingAmount: 'float',
            note: 'string',
            category: 'string', 
        }
    }
}

// Expense schema
class Expense extends Realm.Object {
    static schema = {
        name: 'Expense',
        primaryKey: 'id',
        properties: {
            id: 'string',
            amount: 'float',
            date: 'date',
            note: 'string',
            category: 'string',
        }
    }
}

// Income schema
class Income extends Realm.Object {
    static schema = {
        name: 'Income',
        primaryKey: 'id',
        properties: {
            id: 'string',
            amount: 'float',
            date: 'date',
            note: 'string',
            category: 'string',
        }
    }
}

export { User, Expense, Income, Budget };

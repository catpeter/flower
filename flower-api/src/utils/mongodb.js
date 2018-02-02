/**
 * mongodb操作类(封装mongodb)
 */
import config from '../../config/basic.config'
import {ObjectID, MongoClient} from 'mongodb'
import assert from 'assert'
const dbURL = config.mongodb_url // 从配置文件获取数据库连接
let db

const DB = function () {}

DB.prototype.connection = () => {
  if (!db) {
    MongoClient.connect(dbURL, function (err, database) {
      // 启动初始化数据
      assert.equal(null, err)
      db = database
    })
  }
}

/**
 * 保存数据
 * @param tableName 表名
 * @param fields 表数据
 *
 */
DB.prototype.save = (tableName, fields) => {
  return new Promise((resolve, reject) => {
    if (!fields) {
      reject(new Error('Field is not allowed for null'))
    }
    if (typeof fields._id !== 'undefined') {
      fields._id = ObjectID(fields._id)
    }
    const collection = db.collection(tableName)
    collection.save(fields, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

/**
 * 保存数据array
 * @param tableName 表名
 * @param array 表数据
 *
 */
DB.prototype.insertMany = (tableName, array) => {
  return new Promise((resolve, reject) => {
    if (!(array instanceof Array) || array.length === 0) {
      reject(new Error('array must be Array type and array is not allowed for null'))
    }
    const collection = db.collection(tableName)
    array.forEach(element => {
      if (typeof element._id !== 'undefined') {
        element._id = ObjectID(element._id)
      }
    })
    collection.insertMany(array, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
/**
 * 更新数据
 * @param tableName 表名
 * @param conditions 更新需要的条件 {_id: id, user_name: name}
 * @param updateFields 要更新的字段 {age: 21, sex: 1}
 * @param upsert 不存在是否新增 true false
 * @param multi 多条 true false
 */
DB.prototype.update = (tableName, conditions, updateFields, upsert, multi) => {
  return new Promise((resolve, reject) => {
    if (!updateFields) {
      reject(new Error('Field is not allowed for null'))
    }
    const collection = db.collection(tableName)
    if (typeof conditions._id !== 'undefined') {
      conditions._id = ObjectID(conditions._id)
    }
    if (typeof updateFields._id !== 'undefined') {
      updateFields._id = ObjectID(updateFields._id)
    }
    collection.update(conditions, {
      $set: updateFields
    }, {
      upsert: upsert,
      multi: multi
    }, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
      // reject(errResult(err))
    })
  })
}

/**
 * 更新数据方法(带操作符的)
 * @param tableName 数据表名
 * @param conditions 更新条件 {_id: id, user_name: name}
 * @param updateFields 更新的操作符 {$set: {id: 123}}
 */
DB.prototype.updateAtomic = (tableName, conditions, updateFields) => {
  if (!updateFields) {
    throw new Error('updateFields is null')
  }
  return new Promise((resolve, reject) => {
    if (typeof conditions._id !== 'undefined') {
      conditions._id = ObjectID(conditions._id)
    }
    const collection = db.collection(tableName)
    collection.findOneAndUpdate(conditions, updateFields, {}, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

/**
 * 删除数据
 * @param tableName 表名
 * @param conditions 删除需要的条件 {_id: id}
 */
DB.prototype.remove = (tableName, conditions) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(tableName)

    if (typeof conditions._id !== 'undefined') {
      conditions._id = ObjectID(conditions._id)
    }
    collection.remove(conditions, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

/**
 * 查询数据
 * @param tableName 表名
 * @param conditions 查询条件
 * @param fields 查询字段
 */
DB.prototype.find = (tableName, conditions = {}, fields = []) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(tableName, fields)
    if (typeof conditions._id === 'string') {
      conditions._id = ObjectID(conditions._id)
    }
    collection.find(conditions, fields).toArray((err, docs) => {
      if (err) {
        reject(err)
      } else {
        resolve(docs)
      }
    })
  })
}

/**
 * 分组查询数据
 * @param tableName 表名
 * @param conditions 查询条件
 * @param fields 查询字段
 */
DB.prototype.groupBy = (tableName, keys, conditions, initial, reduce) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(tableName)
    collection.group(keys, conditions, initial, reduce, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

/**
 * 查询单条数据
 * @param tableName 表名
 * @param conditions 查询条件
 */
DB.prototype.findOne = (tableName, conditions) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(tableName)
    if (typeof conditions._id !== 'undefined') {
      conditions._id = ObjectID(conditions._id)
    }
    collection.findOne(conditions, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

/**
 * 根据_id查询指定的数据
 * @param tableName 表名
 * @param _id 可以是字符串或 ObjectId 对象。
 */
DB.prototype.findById = (tableName, id, fields = []) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(tableName)
    collection.findOne({
      _id: ObjectID(id)
    }, fields, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

/**
 * 返回符合条件的文档数
 * @param tableName 表名
 * @param conditions 查询条件
 */
DB.prototype.count = (tableName, conditions) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(tableName)
    if (typeof conditions._id !== 'undefined') {
      conditions._id = ObjectID(conditions._id)
    }
    collection.count(conditions, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

/**
 * 查询符合条件的文档并返回根据键分组的结果
 * @param tableName 表名
 * @param field 待返回的键值
 * @param conditions 查询条件
 */
DB.prototype.distinct = (tableName, field, conditions) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(tableName)
    if (typeof conditions._id !== 'undefined') {
      conditions._id = ObjectID(conditions._id)
    }
    collection.distinct(field, conditions, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

/**
 * 连写查询
 * @param tableName 表名
 * @param conditions 查询条件 {a:1, b:2}
 * @param options 选项：{fields: "a b c", sort: {time: -1}, limit: 10}
 */
DB.prototype.where = (tableName, conditions, options) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(tableName)
    if (typeof conditions._id !== 'undefined') {
      conditions._id = ObjectID(conditions._id)
    }
    collection.find(conditions)
      .sort(options.sort || {})
      .limit(options.limit || {})
      .toArray((err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
  })
}
/**
 * 分页查询
 * @param tableName 表名
 * @param conditions
 * @param fields
 * @param skipnum
 * @param limitnum
 * @param sortOrder
 */
DB.prototype.pagefind = (tableName, conditions, fields, skipnum, limitnum, sortOrder) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(tableName)
    collection.find(conditions, fields)
      .skip(skipnum)
      .limit(limitnum)
      .sort(sortOrder)
      .toArray((err, docs) => {
        if (err) {
          reject(err)
        } else {
          resolve(docs)
        }
      })
  })
}
module.exports = new DB()

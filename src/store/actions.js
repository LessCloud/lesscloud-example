import lcAPI from 'lesscloud-sdk';
import * as types from './types'

export const createRecord = (store, model, data, msg) => {
    lcAPI.save(model, data).then((response)=>{
        // console.log(response)
        showMsg(store, msg.success || 'The new record created was successfully!', 'success')
        store.dispatch(types.LC_CREATE_SUCCESS, { model: response.data })
    }).catch((response)=>{
        // console.log('error: ' + response)
        showMsg(store, response.data.errors && msg.failure || 'The new record created was failure!')
        store.dispatch(types.LC_CREATE_FAILURE, { model: response.data })
    });
}


export const readRecord = (store, model, params, msg) => {
    lcAPI.find(model, params).then((response)=>{
        store.dispatch(types.LC_READ_SUCCESS, { model: response.data })
    }).catch((response)=>{
        // console.log('error: ' + response)
        showMsg(store, response.data.errors && msg.failure || 'The record read failure!')
        store.dispatch(types.LC_READ_FAILURE, { model: response.data })
    });
}

export const updateRecord = (store, model, data, msg) => {
    lcAPI.save(model, data).then((response)=>{
        showMsg(store, msg.success || 'The new record created was successfully!', 'success')
        store.dispatch(types.LC_UPDATE_SUCCESS, { model: response.data })
    }).catch((response)=>{
        showMsg(store, response.data.errors && msg.failure || 'The record updated was failure!')
        store.dispatch(types.LC_UPDATE_FAILURE, { model: response.data })
    });
}

export const deleteRecord = (store, model, data, msg) => {
    lcAPI.remove(model, data).then((response)=>{
        showMsg(store, msg.success || 'One record removed was successfully!', 'success')
        store.dispatch(types.LC_DELETE_SUCCESS, { model: response.data })
    }).catch((response)=>{
        showMsg(store, response.data.errors && msg.failure || 'The request to remove record has been failure!')
        store.dispatch(types.LC_DELETE_FAILURE, { model: response.data })
    });
}

export const readAllRecord = (store, model, params, msg) => {
    lcAPI.findAll(model, params).then((response)=>{
        store.dispatch(types.LC_READ_ALL_SUCCESS, { items: response.data })
    }).catch((response)=>{
        showMsg(store, response.data.errors && msg.failure || 'Failure getting records!')
        store.dispatch(types.LC_READ_ALL_FAILURE, { items: response.data })
    });
}





// find all records
// {'$order':{'createdAt':-1}}
// const books = lcAPI.findAll('book', {'$order':{'createdAt':1}}) // sort by asc
// const books = lcAPI.findAll('book', {'$order':{'createdAt': -1}}) // sort by desc
// const books = lcAPI.findAll('book', {'$fields':'-name,-cover', '$limit':1, '$order':{'createdAt': 1}}) // sort by asc and limit 1
// .then((res)=>{
//     console.log(res.body(false))
// })
// .catch((res)=>{
//     alert('error');
//     console.log(res)
// });


// find one record with the specified id
// const book = lcAPI.find('book', '58c158a1ea930f7f49749954')
// const book = lcAPI.find('book', '{"isbn":"9787222152359"}')
// .then((res)=>{
//     const article = res.body().data();
//     console.log(article);
// })
// .catch((res)=>{
//     alert('error');
//     console.log(res)
// });

// update one record with the specified id
// const data = {"_id":"58c15a66ea930f7f4d393c64","name":"猫的私人词典111","price":78,"cover":"\/\/o9fh1zquu.bkt.clouddn.com\/FmAT3_sFkF9kqqVuzRuUueaaWrKS","bookIntro":"none","rate":1,"isbn":"1","publisher":"华东师范大学出版社","publishDate":"2016-10","pageCount":"508","userId":"58a9b95cea930f633c6d3d12","ACL":{"read":[],"update":[],"delete":[]},"updatedAt":"2017-03-16T15:28:41.555Z","createdAt":"2017-03-09T13:36:38.844Z","snapshotVersion":34};

// const book = lcAPI.save('book', data)
// .then((res)=>{
//     console.log(res);
// })
// .catch((res)=>{
//     alert('error');
//     console.log(res)
// });



// add one record
// const data = {"name":"猫的私人词典","price":78,"cover":"\/\/o9fh1zquu.bkt.clouddn.com\/FmAT3_sFkF9kqqVuzRuUueaaWrKS","bookIntro":"none","rate":1,"isbn":"1","publisher":"华东师范大学出版社","publishDate":"2016-10","pageCount":"508","userId":"58a9b95cea930f633c6d3d12","ACL":{"read":[],"update":[],"delete":[]},"updatedAt":"2017-03-16T15:28:41.555Z","createdAt":"2017-03-09T13:36:38.844Z","snapshotVersion":34};
// const book = lcAPI.save('book', data)
// .then((res)=>{
//     console.log(res);
// })
// .catch((res)=>{
//     alert('error');
//     console.log(res)
// });





// remove one record with the specified id
// const data = {"_id":"58cee6e4ea930f7f54332a04"};

// const book = lcAPI.remove('book', data)
// .then((res)=>{
//     console.log(res);
// })
// .catch((res)=>{
//     alert('error');
//     console.log(res)
// });








// get all records with the restful.js original methods.

// const books = lcAPI.restful.all('book');

// books.getAll().then((response) => {
//     console.log(response.body(false));
// });




// get one record with the restful.js original methods.

// const book = lcAPI.restful.one('book','58c15a66ea930f7f4d393c64');

// book.get().then((response) => {
//     const articleEntity = response.body();
//     const article = articleEntity.data();
//     console.log(article); // hello, world!
// });
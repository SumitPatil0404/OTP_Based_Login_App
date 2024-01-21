const express = require('express');


const router = express.Router()
const DB = require('./DataBase/DataBase')
const checkStudent = async (email) => {
    let query = `select * from StudentsApp where email='${email}'`
    let result = await DB.runQuery(query)
    if (result.result.length == 0) {
        return false;
    }

    return true;

}

router.post('/app/check', async (req, resp) => {

    let result=await checkStudent(req.body.email)
    try
    {
        resp.send({
            ok:true,
            present:result
        })

    }
    catch(err)
    {
        resp.send({
            ok:false
        })
    }

})


const getStudentData=async (email)=>
{
    let query=`select data from StudentsApp where email='${email}'`
    let result=await DB.runQuery(query)
    return result.result[0].data;
}
router.post('/app/login',async (req,resp)=>
{
    let email=req.body.email
    let data=await getStudentData(email)
    try {

        resp.send({
            ok:true,
            data:data
        })
        
    } catch (err) {

        resp.send({
            ok:false
        })
        
    }
    
})


const SaveStudentData=async (email,data)=>
{
    let query=`insert into StudentsApp (email,data) values('${email}','${data}')`
    let result=await DB.runQuery(query)
    if(!result.error)
    {
        return true
    }
    return false
}
router.post('/app/signup',async (req,resp)=>
{
    let email=req.body.email
    let data=req.body.data;
    console.log(req.body);
    let result=await SaveStudentData(email,data)
    resp.send({
        ok:result
    })

})

const EditData = async (email, data) => {
    let query = `update StudentsApp set data='${data}' where email='${email}'`
    let result = await DB.runQuery(query)
    if (result.error) {
       return false
    }
    return true
 }
 
 router.post('/app/editdata', async (req, resp) => {
    let email = req.body.email
    let data = req.body.data
    let result = await EditData(email, data)
    console.log("done")
    try {
       resp.send(
          {
             ok: result
          }
       )
    }
    catch (err) {
 
    }
 
 })
module.exports = router
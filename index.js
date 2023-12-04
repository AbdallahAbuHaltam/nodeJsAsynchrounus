const fs =require('fs');
const superagent=require('superagent');

const readFilePro=file=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(file,(err,data)=>{
            if(err) reject('I could not found this file');
            resolve(data);
        });
    });
}
const writeFilePro=(file,data)=>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(file,data,err=>{
         if(err) reject('I could not found this file');
            resolve('success');
        });
    });
}

const getDogPhoto=async()=>{
    try{
        const data =await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed :${data}`);
        const res =await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(res.body.message);
        await writeFilePro('dog-img.txt',res.body.message);
        console.log('Random Image of dog');
    }
    catch(err){
        console.log(err);
    }
    
}
getDogPhoto();

/*readFilePro(`${__dirname}/dog.txt`)
    .then(data=>{
        console.log(`Breed :${data}`);
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)})
        .then(res=>{
            console.log(res.body.message);
            return writeFilePro('dog-img.txt',res.body.message);
    })
    .then(
        console.log('Random Image of dog')
    )
    .catch(err=>{
        console.log(err.message);
    });

*/
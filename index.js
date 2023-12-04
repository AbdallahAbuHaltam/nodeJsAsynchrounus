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
        const res1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const all = await Promise.all([res1, res2, res3]);
        const img=all.map(el=>el.body.message);
        console.log(all);

        console.log(img.join('\n'));
        await writeFilePro('dog-img.txt',img.join('\n'));
        console.log('Random Image of dog');
    }
    catch(err){
        console.log(err);
        throw err;
    }
    return "2:READY";
}
console.log('1:Will get the dog photo');
getDogPhoto().then(x=>{
    console.log(x);
    console.log('3:Done');

}).catch(err=>{
    console.log('ERROR');
});

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
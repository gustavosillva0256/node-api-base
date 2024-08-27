import { Router } from 'express';
import { prisma } from '../libs/prisma';
import { createUser, createUsers, selectUserEmail } from '../services/user';


export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});


mainRouter.post('/users', async(req, res)=>{

    const users = await createUser({
        name: "PAULO ABREU com post",
        email: "paul2o@gmail.com",
        posts:{
            create: {
                title: "Post 1",
                body: "Conteudo do post 1"
            }
        }
    })
   

    if(users){
        return res.status(201).json(users)
    }else{
        return res.status(500).json({error: "Erro ao criar usuário"})
    }


})

mainRouter.get('/users', async(req, res)=>{ 
res.json(await prisma.user.findMany())

})

mainRouter.post('/user', async(req, res)=>{

    const result = await createUsers([
        
            {name: "JOAO FIGUEIRA", email: "joao@gmail.com"},
            {name: "JOAO FIGUEIRA 21", email: "joao@gmail.com"},
            {name: "MARIA JOSE", email: "maria@gmail.com"},
            {name: "GUMERCINDO", email: "gumercindo@bol.com"},
            {name: "GALERINHA", email: "gumercindo@hotmail.com"}                 
        
    ])

    return res.json({result})

})


mainRouter.get('/user', async(req, res)=>{
    const result = await selectUserEmail()
    
    return res.json({result})
}
 
)
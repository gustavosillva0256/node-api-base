import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";


export const createUser = async (data: Prisma.UserCreateInput) =>{
    try {
         return await prisma.user.create({
            data
        })
    } catch (error) {
        
        return false
    }
}


export const createUsers  = async (user: Prisma.UserCreateInput[] )=>{

    return await prisma.user.createMany({
        data: user,
        skipDuplicates: true
    })
}


export const selectUserEmail = async () =>{

    const users = await prisma.user.findMany({
        where:{
            OR:[
                {
                    email:{
                        endsWith:'@gmail.com'
                    }
                },
                {
                    email:{
                        endsWith:'@hotmail.com'
                    }
                }, 
                
            ],
            AND:[
                {
                    role:{
                        in: ['ADMIN']
                    }
                }
            ]
            
        },
        select:{
            name: true,
            posts:{
                select:{
                    title: true,
                    body: true
                }
            }
        }
        
       

        
    })
    return users
}
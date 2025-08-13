import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq,and, isNull } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";


export  async function GET( request : NextRequest ){
    try {
        const { userId } = await auth();
            if (!userId) {
              return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
         
        const searchParams = request.nextUrl.searchParams;
        const queryUserID = searchParams.get("userId")
        const parentId = searchParams.get("parentId");

        if(!queryUserID || queryUserID !== userId){
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        //fetch fiels from db

        let userFiles; 
        if(parentId){
            userFiles = await db.select().from(files).where(and(
                eq(files.userID, userId),
                eq(files.parentId, parentId)
            ))

        }else{

            await db.select().from(files).where(
                and(eq(files.userID, userId), isNull(files.parentId))
            )

        }
        return NextResponse

    } catch (error) {
        console.error("Error fetching files:", error);
        return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
    }
}
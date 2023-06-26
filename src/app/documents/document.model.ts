import { ObjectId } from "mongodb";


export class Document { 

    constructor(
        public id: string = "", 
        public name: string ="",
        public description: string ="",
        public url: string ="",
        public children: Document[]
    )
    { }
}

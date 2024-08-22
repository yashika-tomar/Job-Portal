//data uri will be generated here and then send to user.controller.js
//A URI (Uniform Resource Identifier) is a string that identifies a resource on the internet. 
//It's a way to address a resource, such as a web page, image, or file, so that it can be located and accessed.
import DataUriParser from 'datauri/parser.js';
import path from 'path';//Node.js built-in path module provides utilities for working with file paths.

const getDataUri = (file) =>{
            if (!file || !file.originalname || !file.buffer) {
                        throw new Error('Invalid file object');
                    }
            const parser = new DataUriParser();
            const extName = path.extname(file.originalname).toString();//file object is an argument, which is expected to have an originalName property and a buffer property.
            return parser.format(extName,file.buffer);// path.extname function to extract the file extension from the originalName property. The toString() method is called to convert the extension to a string.

}
export default getDataUri;
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
    try {
        const jsonDirectory = path.join(process.cwd(), '/src/pages/json/static.json');
        const fileContents = await fs.readFile(jsonDirectory,'utf8' );
        res.status(200).json(JSON.parse(fileContents));
    } catch (error) {
        res.status(401).json(error)
    }

}
import { Controller, Get, Post, Req, Body, HttpException, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { Result } from 'src/interfaces/result';

@Controller('learn/adminapi')
export class MockController {

    @Get('*')
    handleGet(@Req() req: Request, @Res() res: Response): Result {
        const url = req.url.replace('/learn/adminapi/', '');
        const filePath = path.resolve('src/data', url + '.json');

        const isExist = fs.existsSync(filePath);
        if (!isExist) {
            // throw new HttpException('Not Found', 404);
            res.status(404).send();
        }

        const raws = fs.readFileSync(filePath, {encoding: 'utf8'});
        return {
            error: 0,
            code: 200,
            message: 'success',
            data: JSON.parse(raws),
        };
    }

    @Post('*')
    handlePost(@Req() req: Request, @Body() body: any): Result  {
        console.log(body)
        const url = req.url.replace('/learn/adminapi/', '');
        const filePath = path.resolve('src/data', url + '.json');
        const raws = fs.readFileSync(filePath, {encoding: 'utf8'});
        return {
            error: 0,
            code: 200,
            message: 'success',
            data: JSON.parse(raws),
            requestBody: body,
        };
    }
}

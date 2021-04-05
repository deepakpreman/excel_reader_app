exports.excelReader = function(req,res) {    
    var XLSX = require('xlsx');
    var fs = require('fs');

    if(!req.file){        
        res.json({
            status : false,
            message : "No file passed",
            data : [],
        });
        return;
    }
    let ext = req.file.originalname.split('.')[req.file.originalname.split('.').length-1];
    if(ext !== 'xlsx' && ext !== 'xls' && ext !== 'xls' && ext !== 'xls' && ext !== 'csv'){
        fs.unlinkSync('./uploads/' + req.file.filename)
        res.json({
            status : false,
            message : "Not an excel file",
            data : [],
        });
        return;
    }
    var workbook = XLSX.readFile('./uploads/' + req.file.filename);
    var sheet_name_list = workbook.SheetNames;
    sheet_name_list.forEach(function(y) {
        var worksheet = workbook.Sheets[y];
        var headers = {};
        var data = [];
        for(z in worksheet) {
            if(z[0] === '!') continue;
            //parse out the column, row, and value
            var tt = 0;
            for (var i = 0; i < z.length; i++) {
                if (!isNaN(z[i])) {
                    tt = i;
                    break;
                }
            };
            var col = z.substring(0,tt);
            var row = parseInt(z.substring(tt));
            var value = worksheet[z].v;

            //store header names
            if(row == 1 && value) {
                headers[col] = value;
                continue;
            }

            if(!data[row]) data[row]={};
            data[row][headers[col]] = value;
        }
        //drop those first two rows which are empty
        data.shift();
        data.shift();
        // console.log(data);
        fs.unlinkSync('./uploads/' + req.file.filename)
        res.json({
            status : true,
            message : "Success",
            data : data,
        }); 
    }); 
}
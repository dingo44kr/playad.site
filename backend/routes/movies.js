var express = require('express');
var fs = require('fs');
var router = express.Router();
const XlsxPopulate = require('xlsx-populate');
var mysql = require('mysql');
const mime = require('mime');
const path = require('path');

var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'playautomanage14',
  database : 'playad'
});

conn.connect();

const filePath = './public/uploadFile/';

router.get('/', function (req, res, next) {
  const data = {
    title: 'Hello World',
    message: 'GET',
    checked_1: true,
    checked_2: true,
    checked_3: true,
    checked_work: 3,
    Afile: '티몬직접수집DB(A파일).xlsx',
    Bfile: '통판수집DB(A파일).xlsx',
    Cfile: '엔비스타DB(A파일).xlsx',
    file: null,
    fileName: 'out.xlsx'
  };
  res.send(data)
});

router.post('/', function (req, res, next) {
  var data = req.body.data

  XlsxPopulate.fromFileAsync(filePath+data.Afile)
    .then(workbook_A => {
      const Sheet_A = workbook_A.sheet(0)
      XlsxPopulate.fromFileAsync(filePath+data.Bfile)
        .then(workbook_B => {
          const Sheet_B = workbook_B.sheet(0)
          XlsxPopulate.fromFileAsync(filePath+data.Cfile)
            .then(workbook_C => {
              const Sheet_C = workbook_C.sheet(0)
            var aph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var i = 0,
              j = 0;
            var A_range = Sheet_A.usedRange();
            var A_values = Sheet_A.usedRange().value();
            var B_range = Sheet_B.usedRange();
            var B_values = Sheet_B.usedRange().value();
            var C_range = Sheet_C.usedRange();
            var C_values = Sheet_C.usedRange().value();
            
            A_values.splice(0, 1);
            B_values.splice(0, 1);
            C_values.splice(0, 1);

            for( let i = 0 ; i < A_values.length ; i++) {
              if(A_values[i][0] == undefined) {
                A_values.splice(i, 1);
                i--;
              }
            }
            for( let i = 0 ; i < B_values.length ; i++) {
              if(B_values[i][0] == undefined) {
                B_values.splice(i, 1);
                i--;
              }
            }
            for( let i = 0 ; i < C_values.length ; i++) {
              if(C_values[i][0] == undefined) {
                C_values.splice(i, 1);
                i--;
              }
            }
            for( let i = 0; i < A_values.length ; i++) {
              A_values[i][12] = '티몬'
              if( Sheet_A.cell('H'+(i+2)).style('fill') != undefined) {
                if(Sheet_A.cell('H'+(i+2)).style('fill').color != undefined) {
                  if ( A_values[i][11] = Sheet_A.cell('H'+(i+2)).style('fill').color.rgb != undefined ) {
                    A_values[i][11] = Sheet_A.cell('H'+(i+2)).style('fill').color.rgb;
                  } else {
                    A_values[i][11] = null;
                  }
                } else {
                  A_values[i][11] = null;
                }
              } else {
                A_values[i][11] = null;
              }
            }
            for( let i = 0; i < B_values.length ; i++) {
              B_values[i][12] = '통판'
              if( Sheet_B.cell('H'+(i+2)).style('fill') != undefined) {
                if(Sheet_B.cell('H'+(i+2)).style('fill').color != undefined) {
                  if ( B_values[i][11] = Sheet_B.cell('H'+(i+2)).style('fill').color.rgb != undefined ) {
                    B_values[i][11] = Sheet_B.cell('H'+(i+2)).style('fill').color.rgb;
                  } else {
                    B_values[i][11] = null;
                  }
                } else {
                  B_values[i][11] = null;
                }
              } else {
                B_values[i][11] = null;
              }
            }


            for( let i = 0; i < C_values.length ; i++) {
              C_values[i][12] = '앤비스타'
              if( Sheet_C.cell('H'+(i+2)).style('fill') != undefined) {
                if(Sheet_C.cell('H'+(i+2)).style('fill').color != undefined) {
                  if ( C_values[i][11] = Sheet_C.cell('H'+(i+2)).style('fill').color.rgb != undefined ) {
                    C_values[i][11] = Sheet_C.cell('H'+(i+2)).style('fill').color.rgb;
                  } else {
                    C_values[i][11] = null;
                  }
                } else {
                  C_values[i][11] = null;
                }
              } else {
                C_values[i][11] = null;
              }
            }
            let R1, R2, R3;
            var overlap = 0;
            let D1, D2, D3;
            D1 = Boolean(typeof (data.checked_1) != 'undefined');
            D2 = Boolean(typeof (data.checked_2) != 'undefined');
            D3 = Boolean(typeof (data.checked_3) != 'undefined');

            for (i = 0; i < A_values.length ; i++) {
              overlap = 0;
              for (j = 0; j < B_values.length; j++) {
                R1 = Boolean(A_values[i][0] == B_values[j][0]);
                R2 = Boolean(A_values[i][1] == B_values[j][1]);
                R3 = Boolean(A_values[i][5] == B_values[j][5]);
                if (D1 && R1) {
                  overlap = 1;
                  break;
                }
                if (D2 && R2) {
                  overlap = 1;
                  break;
                }
                if (D3 && R3) {
                  overlap = 1;
                  break;
                }
              }
              if (overlap == 1){
                B_values.splice(j, 1);
              }
            }
            for (i = 0; i < A_values.length ; i++) {
              overlap = 0;
              for (j = 0; j < C_values.length; j++) {
                R1 = Boolean(A_values[i][0] == C_values[j][0]);
                R2 = Boolean(A_values[i][1] == C_values[j][1]);
                R3 = Boolean(A_values[i][5] == C_values[j][5]);
                if (D1 && R1) {
                  overlap = 1;
                  break;
                }
                if (D2 && R2) {
                  overlap = 1;
                  break;
                }
                if (D3 && R3) {
                  overlap = 1;
                  break;
                }
              }
              if (overlap == 1){
                C_values.splice(0, 1);
              }
            }
            for(i = 0 ; i < B_values.length ; i++) {
              A_values.push(B_values[i])
            }
            for(i = 0 ; i < C_values.length ; i++) {
              A_values.push(C_values[i])
            }
            //DB와 비교
            
            conn.query('SELECT name,number,tel from `over`', function (error, results) {
              let arr = [];
              for (i = 0; i < results.length; i++) {
                for (j = 0; j < A_values.length; j++) {                        
                  
                  R1 = Boolean(results[i].name == A_values[j][0]);
                  R2 = Boolean(results[i].number == A_values[j][1]);
                  R3 = Boolean(results[i].tel == A_values[j][5]);
                  if (D1 && R1) {
                    overlap = 1;
                    break;
                  }
                  if (D2 && R2) {
                    overlap = 1;
                    break;
                  }
                  if (D3 && R3) {
                    overlap = 1;
                    break;
                  }
                }
                if (overlap == 1) {
                  if (data.checked_work == 2) {
                      arr.push(A_values[j]);
                  }
                  if (data.checked_work == 3) {
                      A_values.splice(j, 1);
                      j -= 1;
                  }
                }                
              }
              if (data.checked_work == 2) {
                A_values = arr;
              }              

              
              if (data.checked_work == 3) {
                for( let i = 0 ; i < A_values.length; i++ ) {
                  
                  for (let j = 0; j < 12; j++) {
                    if(A_values[i][j] == undefined) A_values[i][j] = "";
                  }

                  let sql_value = '("'+
                  A_values[i][12] +
                  '","'+A_values[i][0]+
                  '","'+A_values[i][1]+
                  '","'+A_values[i][2]+
                  '","'+A_values[i][3]+
                  '","'+A_values[i][4]+
                  '","'+A_values[i][5]+
                  '","'+A_values[i][6]+
                  '","'+A_values[i][7]+
                  '","'+A_values[i][8]+
                  '","'+A_values[i][9]+
                  '","'+A_values[i][10]+
                  '","'+A_values[i][11]+
                  '")';
                  conn.query(
                    'INSERT INTO `over` (class, name, number, op1, op2, op3, tel, mail, cal, op4, op5, op6, color) values '+ sql_value,

                    function (error, results, fields) {
                      if (error) throw error;
                      // Neat!
                  });
                }
              }

              XlsxPopulate.fromFileAsync(filePath+'tle.xlsx')
              .then(workbook => {
                var r = workbook.sheet(0).range("A2:K" + A_values.length+1).value(A_values);
                for( let i = 0 ; i < A_values.length ; i++) {
                  if(A_values[i][11] != '') {
                    workbook.sheet(0).range('A'+(i+2)+':K'+(i+2)).style("fill", { type: 'solid', color: { rgb: A_values[i][11] }
                  })
                  }
                }
                workbook.toFileAsync(filePath+"out.xlsx");
                console.log('done!')
                return res.send("file");
              });
            })
            // if (data.checked_work == 1) {
            //   for (i = 0; i < B_values.length; i++) {
            //     A_values.push(B_values[i]);
            //   }
            // }
            
          });
      });
  });
});

//fileupload
router.post('/up', function (req, res, next) {

  let file;

  if (!req.files) {
    console.log('File was not found');
    res.send("File was not found");
    return;
  }

  file = req.files.tempfile;

  file.mv(filePath + file.name, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log('File uploaded!')
    res.send('Success')
  });
});

router.get('/view', function (req, res, next) {
  conn.query('SELECT * from `over`', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

router.get('/down', function (req, res, next) {
  let file = __dirname + `/uploadFile/js.txt`;
  // console.log(file)
  let filename = path.basename(file);
  console.log(filename);
  let mimetype = mime.getType(file);
  console.log(mimetype)

  res.setHeader('Content-disposition', 'attachment; filename=js.txt'); // origFileNm으로 로컬PC에 파일 저장
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
});

module.exports = router;
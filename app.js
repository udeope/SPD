let express = require("express");
let app = express();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");

let farmacia = {
	titular: "Joy",
	direction: "joy@example.com",
	fullName: "New York",
	dni: "478946",
	tarjetaSanitaria: "123456",
	iban: "987654321",
	firmaPaciente: "pepito",
	firmaFarmaceutico: "juanito",
	};
	


app.get("/generateReport", (req, res) => {
	ejs.renderFile(path.join(__dirname, './views/', "report-template.ejs"), {
        farmacia: farmacia
    }, (err, data) => {
        if (err) {
			console.log(err)
            res.send(err);
        } else {
            let options = {
                "height": "11.25in",
                "width": "8.5in",
                "header": {
                    "height": "20mm",
                },
                "footer": {
                    "height": "20mm",
                },

            };
            pdf.create(data, options).toFile("report.pdf", function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("File created successfully");
                }
            });
        }
    });
})

app.listen(8080);

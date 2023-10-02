const express = require("express");
const router = express.Router();
const ProgrammingLanguages = require("../services/progLang.service");
const ProgrammingLanguagesChapters = require("../services/progLangChapter.service")
const session = require("express-session");
const { authMiddleware } = require("./auth");

router.get("/db", authMiddleware ,async (req, res) => {
    const dbDataService = new ProgrammingLanguages();
    const dbDataChapters = new ProgrammingLanguagesChapters();
    if(req.session.token){
        try {
            const languageList = await dbDataService.getAll();
            const langObjs = languageList.map(language => {
                const langObj= {
                    id: language.id,
                    name: language.name
                }
                return langObj
            })
            let theData = []
            for (let i=0; i<langObjs.length; i++){
                const langID = langObjs[i].id
                const langObj = langObjs[i];
                const lesson = await dbDataChapters.getChapters(langID);
                theData.push(
                    {
                        lang: langObj,
                        lesson: lesson
                    }
                )    
            }
            // for (let i = 0; i < theData.length; i++) {
            //     console.log(theData[i].lang.name)
            //     for(let j = 0; j < theData[i].lesson.length; j++){
            //         console.log(theData[i].lesson[j].chapter);
            //     }
            
            // }
            // console.log("theData", theData);  
            res.render("db", {
                theData
            })
            // console.log(lessons);
        } catch (error){
            console.log("ERR",error);
            res.status(500).send("Internal server error")
        }
    } else {
        res.redirect("/")
    }
})

module.exports = router;
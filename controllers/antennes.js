const express = require('express');
const router = express.Router();
const axios = require('axios');


async function getAntennas(antennasData) {

    const result = await axios(antennasData)
    // console.log('result', result.data)
    var buf = new Buffer.from(result.data, 'base64');
    //console.log('\n string', buf.toString())
    const bufJson = buf.toString();
    const convertbuf = JSON.parse(bufJson)
    //return res.json(convertbuf)
    const reseaux = convertbuf.antennes
    // console.log('reseaux', reseaux)
    console.log("start map")

    const filtre = reseaux.map(elem => {
        const array = { operateur: elem.operateur, ville: elem.ville, adr: elem.adr, loc: elem.loc.reverse(), cp: elem.cp }
        return array
    })

    return filtre

}

// antenne boygue 
router.get('/getAntennas', async (req, res) => {
    try {

        const uriORANGE = "https://www.antennesmobiles.fr/get.php?func=antenne&operateurs=ORANGE&reseaux=5G&active=0&freq=700,800,900,1800,2100,2600,3500&modifstart=&modifend=&start=&end=&latne=50.07336736319201&lngne=9.758593749999957&latsw=45.654761171771945&lngsw=-0.3488281249999909&support=0"
        const uriBOUYGUES = "https://www.antennesmobiles.fr/get.php?func=antenne&operateurs=BOUYGUES%20TELECOM&reseaux=5G&active=0&freq=700,800,900,1800,2100,2600,3500&modifstart=&modifend=&start=&end=&latne=50.07336736319201&lngne=9.758593749999957&latsw=45.654761171771945&lngsw=-0.3488281249999909&support=0"
        const uriSFR = "https://www.antennesmobiles.fr/get.php?func=antenne&operateurs=SFR&reseaux=5G&active=0&freq=700,800,900,1800,2100,2600,3500&modifstart=&modifend=&start=&end=&latne=50.07336736319201&lngne=9.758593749999957&latsw=45.654761171771945&lngsw=-0.3488281249999909&support=0"
        const uriFREE = "https://www.antennesmobiles.fr/get.php?func=antenne&operateurs=FREE%20MOBILE&reseaux=5G&active=0&freq=700,800,900,1800,2100,2600,3500&modifstart=&modifend=&start=&end=&latne=50.07336736319201&lngne=9.758593749999957&latsw=45.654761171771945&lngsw=-0.3488281249999909&support=0"

        orangeArray = await getAntennas(uriORANGE)
        sfrArray = await getAntennas(uriSFR)
        bouyguesArray = await getAntennas(uriBOUYGUES)
        freeArray = await getAntennas(uriFREE)

        antennasData = orangeArray.concat(sfrArray).concat(bouyguesArray).concat(freeArray)

        //TEST pour avoir plus de donnes
        antennasData = antennasData.concat([...antennasData]).concat([...antennasData]).concat([...antennasData])

        res.json({ count: antennasData.length, antennasData })
    } catch (error) {
        console.log('Error occured: ', error);
        res.status(500).send(error)
    }
})






router.get('/bouygue', async (req, res) => {
    try {

        //const uriSFR = "https://www.antennesmobiles.fr/get.php?func=antenne&operateurs=SFR&reseaux=5G&active=0&freq=700,800,900,1800,2100,2600,3500&modifstart=&modifend=&start=&end=&latne=50.07336736319201&lngne=9.758593749999957&latsw=45.654761171771945&lngsw=-0.3488281249999909&support=0"
        const uriBOUYGUES = "https://www.antennesmobiles.fr/get.php?func=antenne&operateurs=BOUYGUES%20TELECOM&reseaux=5G&active=0&freq=700,800,900,1800,2100,2600,3500&modifstart=&modifend=&start=&end=&latne=50.07336736319201&lngne=9.758593749999957&latsw=45.654761171771945&lngsw=-0.3488281249999909&support=0"



        const axios = require('axios');

        const result = await axios(uriBOUYGUES)
        // console.log('result', result.data)
        var buf = new Buffer.from(result.data, 'base64');
        //console.log('\n string', buf.toString())
        const bufJson = buf.toString();
        const convertbuf = JSON.parse(bufJson)
        //return res.json(convertbuf)
        const reseaux = convertbuf.antennes
        console.log('reseaux', reseaux)
        console.log("start map")
        const filtre = reseaux.map(elem => {
            const array = { operateur: elem.operateur, ville: elem.ville, adr: elem.adr, loc: elem.loc.reverse(), cp: elem.cp }
            return array
        })

        res.json(filtre)

    } catch (error) {
        console.log('Error occured: ', error);
        res.status(500).send(error)
    }
})




// router.get('/orange',async (req, res) => {
//     try {

//         const uriORANGE = "https://www.antennesmobiles.fr/get.php?func=antenne&operateurs=ORANGE&reseaux=5G&active=0&freq=700,800,900,1800,2100,2600,3500&modifstart=&modifend=&start=&end=&latne=50.07336736319201&lngne=9.758593749999957&latsw=45.654761171771945&lngsw=-0.3488281249999909&support=0"



//             const axios = require('axios');

//             const result = await axios(uriORANGE)
//             // console.log('result', result.data)
//             var buf = new Buffer.from(result.data, 'base64');
//             //console.log('\n string', buf.toString())
//             const bufJson = buf.toString();
//             const convertbuf = JSON.parse(bufJson)
//            //return res.json(convertbuf)
//            const reseaux =convertbuf.antennes
//            console.log('reseaux',reseaux)
//            console.log("start map")
//         const filtre = reseaux.map(elem =>{
//            const array ={ operateur : elem.operateur, ville : elem.ville, adr : elem.adr, loc : elem.loc.reverse(), cp : elem.cp}
//               return array
//           })

//           res.json(filtre)

//     } catch (error) {
//         console.log('Error occured: ', error);
//         res.status(500).send(error)
//     }
// })




module.exports = router








// router.get('/', (req, res) => {
//     try {
//         (async function () {
//             const uri = "https://www.antennesmobiles.fr/get.php?func=antenne&operateurs=BOUYGUES%20TELECOM&reseaux=5G&active=0&freq=700,800,900,1800,2100,2600,3500&modifstart=&modifend=&start=&end=&latne=50.07336736319201&lngne=9.758593749999957&latsw=45.654761171771945&lngsw=-0.3488281249999909&support=0"
//             const axios = require('axios');

//             const result = await axios(uri)
//             // console.log('result', result.data)
//             var buf = new Buffer.from(result.data, 'base64');
//             console.log('\n string', buf.toString())
//             const bufJson = buf.toString();
//             const convertbuf = JSON.parse(bufJson)
//             res.json(convertbuf)


//         }())

//         // res.json(antennes);
//     } catch (error) {
//         console.log('Error occured: ', error);
//         res.status(500).send(error)
//     }
// })

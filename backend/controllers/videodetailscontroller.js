const {execSync} = require("child_process")
const path = require("path")
const ytdlp = path.join(__dirname,"../essentialfiles","yt-dlp.exe")

const languages = { 
    'ab':'Abkhazian',
    'aa':'Afar',
    'af':'Afrikaans',
    'ak':'Akan',
    'sq':'Albanian',
    'am':'Amharic',
    'ar':'Arabic',
    'an':'Aragonese',
    'hy':'Armenian',
    'as':'Assamese',
    'av':'Avaric',
    'ae':'Avestan',
    'ay':'Aymara',
    'az':'Azerbaijani',
    'bm':'Bambara',
    'ba':'Bashkir',
    'eu':'Basque',
    'be':'Belarusian',
    'bn':'Bengali (Bangla)',
    'bh':'Bihari',
    'bi':'Bislama','bs':'Bosnian','br':'Breton','bg':'Bulgarian','my':'Burmese','ca':'Catalan','ch':'Chamorro','ce':'Chechen','ny':'Chichewa, Chewa, Nyanja','zh':'Chinese','zh-Hans':'Chinese (Simplified)','zh-Hant':'Chinese (Traditional)','cv':'Chuvash','kw':'Cornish','co':'Corsican','cr':'Cree','hr':'Croatian','cs':'Czech','da':'Danish','dv':'Divehi, Dhivehi, Maldivian','nl':'Dutch','dz':'Dzongkha','en':'English','eo':'Esperanto','et':'Estonian','ee':'Ewe','fo':'Faroese','fj':'Fijian','fi':'Finnish','fr':'French','ff':'Fula, Fulah, Pulaar, Pular','gl':'Galician','gd':'Gaelic (Scottish)','gv':'Gaelic (Manx)','ka':'Georgian','de':'German','el':'Greek','kl':'Greenlandic','gn':'Guarani','gu':'Gujarati','ht':'Haitian Creole','ha':'Hausa','he':'Hebrew','hz':'Herero','hi':'Hindi','ho':'Hiri Motu','hu':'Hungarian','is':'Icelandic','io':'Ido','ig':'Igbo','id, in':'Indonesian','ia':'Interlingua','ie':'Interlingue','iu':'Inuktitut','ik':'Inupiak','ga':'Irish','it':'Italian','ja':'Japanese','jv':'Javanese','kl':'Kalaallisut, Greenlandic','kn':'Kannada','kr':'Kanuri','ks':'Kashmiri','kk':'Kazakh','km':'Khmer','ki':'Kikuyu','rw':'Kinyarwanda (Rwanda)','rn':'Kirundi','ky':'Kyrgyz','kv':'Komi','kg':'Kongo','ko':'Korean','ku':'Kurdish','kj':'Kwanyama','lo':'Lao','la':'Latin','lv':'Latvian (Lettish)','li':'Limburgish ( Limburger)','ln':'Lingala','lt':'Lithuanian','lu':'Luga-Katanga','lg':'Luganda, Ganda','lb':'Luxembourgish','gv':'Manx','mk':'Macedonian','mg':'Malagasy','ms':'Malay','ml':'Malayalam','mt':'Maltese','mi':'Maori','mr':'Marathi','mh':'Marshallese','mo':'Moldavian','mn':'Mongolian','na':'Nauru','nv':'Navajo','ng':'Ndonga','nd':'Northern Ndebele','ne':'Nepali','no':'Norwegian','nb':'Norwegian bokmÃ¥l','nn':'Norwegian nynorsk','ii':'Nuosu','oc':'Occitan','oj':'Ojibwe','cu':'Old Church Slavonic, Old Bulgarian','or':'Oriya','om':'Oromo (Afaan Oromo)','os':'Ossetian','pi':'PÄli','ps':'Pashto, Pushto','fa':'Persian (Farsi)','pl':'Polish','pt':'Portuguese','pa':'Punjabi (Eastern)','qu':'Quechua','rm':'Romansh','ro':'Romanian','ru':'Russian','se':'Sami','sm':'Samoan','sg':'Sango','sa':'Sanskrit','sr':'Serbian','sh':'Serbo-Croatian','st':'Sesotho','tn':'Setswana','sn':'Shona','ii':'Sichuan Yi','sd':'Sindhi','si':'Sinhalese','ss':'Siswati','sk':'Slovak','sl':'Slovenian','so':'Somali','nr':'Southern Ndebele','es':'Spanish','su':'Sundanese','sw':'Swahili (Kiswahili)','ss':'Swati','sv':'Swedish','tl':'Tagalog','ty':'Tahitian','tg':'Tajik','ta':'Tamil','tt':'Tatar','te':'Telugu','th':'Thai','bo':'Tibetan','ti':'Tigrinya','to':'Tonga','ts':'Tsonga','tr':'Turkish','tk':'Turkmen','tw':'Twi','ug':'Uyghur','uk':'Ukrainian','ur':'Urdu','uz':'Uzbek','ve':'Venda','vi':'Vietnamese','vo':'VolapÃ¼k','wa':'Wallon','cy':'Welsh','wo':'Wolof','fy':'Western Frisian','xh':'Xhosa','yi, ji':'Yiddish','yo':'Yoruba','za':'Zhuang, Chuang','zu':'Zulu'}


const getvideodetails = async(req,res) =>{
    const videolink = req.body.videourl
    const command = `${ytdlp} --dump-json "${videolink}"`
    console.log(videolink)
    if(videolink.indexOf("list") !== -1){
        res.status(404).send("List command breaks the yt-dlp so please give without list")
        return
    }
    let output 
    try{
        output = execSync(command,{shell:true,maxBuffer:1024 **6})

    const data = JSON.parse(output)
    const title = data['title'];
    const thumbnail = data['thumbnail'];
    const duration = data['duration_string'];
    const releaseDate = data['release_date'];
    const viewcount = data['view_count'];
    const likecount = data['like_count'];
    const metadata = {
        "title":title,
        "thumb":thumbnail,
        "duration":duration,
        "releasedate":releaseDate,
        "viewcount":viewcount,
        "likecount":likecount
    }
    let subtitles = {}
    const videoformats = {};
    const vidformats = {}
    const audioformats = {}
    
    if(data['subtitles']){
        for (const sub of Object.keys(data['subtitles'])){
            subtitles[sub] = languages[sub]
        }
    }

    for (const format of data['formats']) {
        if (format['ext'] !== 'mhtml' && format['format_id'].indexOf("-drc") === -1 && format['format_id']) {
            const all = {};
            // videoformats[format['resolution'].split("x")[1]] = []
            all['formatid'] = format['format_id']
            all['filesize'] = format['filesize'] ? (parseFloat(format['filesize']) / (1024 * 1024)).toFixed(2)+"MB" : null;
            all["resolution"] = all['resolution'] === "audio only"?  null : format['width']
            all['audio_channels'] = format['audio_channels'] ? format['audio_channels'] : null;
            all['language'] = format['language'] ? languages[format['language']] : null;
            all['lang'] = format['language'] ? format['language'] : null;
            all['extension'] = format['ext'];
            all['dynamic_range'] = format['dynamic_range'] ? format['dynamic_range'] : null;
            format['resolution'] === "audio only" ? audioformats[format['format_id']] = all : videoformats[format['format_id']] = all

        }}


        Object.keys(videoformats).map(key=> {
            vidformats[videoformats[key]['resolution']] = []
        })
        Object.keys(videoformats).map(key=> {
            vidformats[videoformats[key]['resolution']].push(videoformats[key])
        })
// Displaying the 'allFormats' data in a table format in the console
        console.log(title,thumbnail,duration,releaseDate)
        console.table(videoformats);
        console.table(audioformats);
        res.status(200).send({"metadata":metadata,"subtitles":subtitles,"videoformats":vidformats,"audioformats":audioformats})

    }
    catch (error){
        console.log(error)
        res.status(404).send("unknow error please check the youtube url correctly")
    }
}

module.exports = {
    getvideodetails
}
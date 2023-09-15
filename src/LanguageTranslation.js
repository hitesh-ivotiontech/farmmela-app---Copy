import translate from 'translate-google-api';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import { GoogleTranslationKey } from './api/ServerConfig';


export const translateText = async (text, success, error) => {
    var url;
    const data = new FormData();
    
    if (Array.isArray(text)) {
        var query = '';
        text.map((item) => {
            // console.log('url of translation',item)
            data.append('q',item)
        })
        url = `https://translation.googleapis.com/language/translate/v2?target=${global.targetLanguage}&format=html&key=${GoogleTranslationKey}`
        console.log('url of translation',url)
    } else {
        // console.log('in normal',)
        //        url = `https://translation.googleapis.com/language/translate/v2?q=${text}&target=${global.targetLanguage}&format=html&source=${global.sourceLanguage}&key=${GoogleTranslationKey}`
        // text.map((item) => {
        //     // console.log('url of translation',item)
        //     data.append('q',item)
        // })
        data.append('q',text)
        url = `https://translation.googleapis.com/language/translate/v2?q=${text}&target=${global.targetLanguage}&format=html&key=${GoogleTranslationKey}`
        console.log('url of translation111',url)
    }
    
    fetch(url, {
        method: 'POST',
        body:data
    }).then(res => res.json())
        .then(result => {
            console.log('language data',result)
            success(result.data.translations)
        }).catch(err => {
            console.log("Error in language transalate", err)
            error(err)
        })

    // TranslatorConfiguration.setConfig(ProviderTypes.Google, GoogleTranslationKey, 'hi', 'en');
    // const translator = TranslatorFactory.createTranslator();
    // translator.translate(text).then(translated => {
    //     alert(translated)
    //     success(translated)
    // }).catch(err => {
    //     alert(err)
    // });

    // try {
    //     const result = await translate(text, {
    //         tld: "com",
    //         to: "hi",
    //         raw: true
    //     })
    //     // console.log("Translated", result[0])
    //     success(result);
    //     // alert(typeof (result[0]))
    // } catch (err) {
    //     error()
    //     console.log(err)
    // }

}


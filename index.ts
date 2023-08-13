
const form: HTMLFormElement = document.querySelector('#defineform');



form.onsubmit = () => {
  //var XMLHttpRequest = require('xhr2');
  const formData = new FormData(form);
  const text = formData.get('defineword') as string;
  console.log(text);
  const formDataList: HTMLFormElement = document.querySelector('#list-got-style'); 

  var req = new XMLHttpRequest();
  req.open('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/' + text, true);
  req.send();

  req.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  var dict = data[0] as dictionary;

  if (req.status >= 200 && req.status < 400) {
    const topUl = document.createElement('ul');
    topUl.append(createLi("Word to define " + dict.word));
    for(const meaning of dict.meanings){
      topUl.append(createLi("Part of speech: " + meaning.partOfSpeech));
      const ul = document.createElement('ul');
      var num = 1;
      for(const def of meaning.definitions){
        const ul3 = document.createElement('ul');
        ul.appendChild(createLi(num.toString()))
        if(def.definition) ul3.appendChild(createLi("Definition: " + def.definition + "\n"));
        if(def.synonyms)ul3.appendChild(createLi("Synonym: " + def.synonyms[0] + "\n"));
        if(def.antonyms) ul3.appendChild(createLi("Antonyms" + def.antonyms + "\n"));
        if(def.example) ul3.appendChild(createLi("Example: " + def.example + "\n"));
        ul.appendChild(ul3);
        topUl.appendChild(ul);
        num++;
      }
    }
    topUl.append(createLi("Pheonetics: "));
    for(const item of dict.phonetics){
      const ul2 = document.createElement('ul');
      if(item.text) ul2.appendChild(createLi("Text: " + item.text));
      if(item.audio) ul2.appendChild(createLi("Audio: " + item.audio + "\n"));
      if(item.license) ul2.appendChild(createLi("License name: " + item.license?.name));
      if(item.sourceUrl) ul2.appendChild(createLi("License URL: " + item.license?.url + "\n"));
      topUl.appendChild(ul2);
    }
    topUl.append(createLi("License Name: " + dict.license.name));
    topUl.append(createLi("License URL: " + dict.license.url));
    topUl.append(createLi("Source URL: " + dict.sourceUrls.urls));

    formDataList.appendChild(topUl);
  } else {
    console.log('error')
  } 
 
  
}
return false;
};

function addLi(item: string){
  const formData: HTMLFormElement = document.querySelector('#list-got-style');
  var li = document.createElement("li");
  li.append(item);
  formData.appendChild(li);
}
function createLi(item: string ){
  var li = document.createElement("li");
  li.append(item);
  return li;
}

  


interface dictionary{

  word: string,
    phonetics:[ {
        text?: string,
        audio?: string,
        sourceUrl?: string,
        license?: {
          name: string,
          url: string,
        }
      }], 
    meanings:[ {
        partOfSpeech: string,
        definitions:[{
            definition?: string,
            example?: string,
            synonyms?:[string],
            antonyms?:[string]
          }]
      }]
    license:{
      name: string,
      url: string,

    }
    sourceUrls: {
      urls: string
    }
      
  }  
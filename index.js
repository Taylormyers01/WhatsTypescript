var form = document.querySelector('#defineform');
form.onsubmit = function () {
    //var XMLHttpRequest = require('xhr2');
    var formData = new FormData(form);
    var text = formData.get('defineword');
    console.log(text);
    var formDataList = document.querySelector('#list-got-style');
    var req = new XMLHttpRequest();
    req.open('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/' + text, true);
    req.send();
    req.onload = function () {
        var _a, _b;
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        var dict = data[0];
        if (req.status >= 200 && req.status < 400) {
            addLi("Word to define " + dict.word);
            for (var _i = 0, _c = dict.meanings; _i < _c.length; _i++) {
                var meaning = _c[_i];
                addLi("Part of speech: " + meaning.partOfSpeech);
                var ul = document.createElement('ul');
                var num = 1;
                for (var _d = 0, _e = meaning.definitions; _d < _e.length; _d++) {
                    var def = _e[_d];
                    var ul3 = document.createElement('ul');
                    ul.appendChild(createLi(num.toString()));
                    if (def.definition)
                        ul3.appendChild(createLi("Definition: " + def.definition + "\n"));
                    if (def.synonyms)
                        ul3.appendChild(createLi("Synonym: " + def.synonyms[0] + "\n"));
                    if (def.antonyms)
                        ul3.appendChild(createLi("Antonyms" + def.antonyms + "\n"));
                    if (def.example)
                        ul3.appendChild(createLi("Example: " + def.example + "\n"));
                    ul.appendChild(ul3);
                    formDataList.appendChild(ul);
                    num++;
                }
            }
            addLi("Pheonetics: ");
            for (var _f = 0, _g = dict.phonetics; _f < _g.length; _f++) {
                var item = _g[_f];
                var ul2 = document.createElement('ul');
                if (item.text)
                    ul2.appendChild(createLi("Text: " + item.text));
                if (item.audio)
                    ul2.appendChild(createLi("Audio: " + item.audio + "\n"));
                if (item.license)
                    ul2.appendChild(createLi("License name: " + ((_a = item.license) === null || _a === void 0 ? void 0 : _a.name)));
                if (item.sourceUrl)
                    ul2.appendChild(createLi("License URL: " + ((_b = item.license) === null || _b === void 0 ? void 0 : _b.url) + "\n"));
                formDataList.appendChild(ul2);
            }
            addLi("License Name: " + dict.license.name);
            addLi("License URL: " + dict.license.url);
            addLi("Source URL: " + dict.sourceUrls.urls);
        }
        else {
            console.log('error');
        }
    };
    return false;
};
function addLi(item) {
    var formData = document.querySelector('#list-got-style');
    var li = document.createElement("li");
    li.append(item);
    formData.appendChild(li);
}
function createLi(item) {
    var li = document.createElement("li");
    li.append(item);
    return li;
}

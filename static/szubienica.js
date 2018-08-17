var sentence = "hasło";

sentence = sentence.toUpperCase();

var length = sentence.length;

var alphabet = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ";

var mistakes = 0;

var coveredSentence = "";

var yes = new Audio("static/sounds/yes.wav");
var no = new Audio("{{url_for('static', filename='sounds/no.wav')}}");

for(i = 0; i < length; i++){
    if(sentence.charAt(i) == " ")
        coveredSentence += " ";
    else
        coveredSentence += "-";
}

function showSentence() {
    document.getElementById("board").innerHTML = coveredSentence;
}

window.onload = initAlphabet;

function initAlphabet(){
    
    var content = "";
    
    
    for(i = 0; i < 35; i++){
        content += '<div id="lit' + i + '" class="letter" onclick="check(' + i + ')">' + alphabet.charAt(i) + '</div>';
        if((i + 1) % 7 == 0)
            content += '<div style="clear:both;"></div>';
    }
    
    document.getElementById("alphabet").innerHTML = content;
    showSentence();

}

String.prototype.setSign = function(spot, sign){
    if(spot > this.length - 1)
        return this.toString();
    else 
        return this.substr(0, spot) + sign + this.substr(spot + 1);
}

function check(nr){
    
    var found = false;
    
    for(i = 0; i < length; i++){
        if(sentence.charAt(i) == alphabet[nr]){
            coveredSentence = coveredSentence.setSign(i, alphabet[nr]);
            found = true;
        }
    }
    
    if(found == true){
        
        yes.play();
        var element = "lit" + nr;
        document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";
		document.getElementById(element).style.cursor = "default";

        
        showSentence();
    }
    else{
        
        no.play();
        var element = "lit" + nr;
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = "3px solid #C00000";
		document.getElementById(element).style.cursor = "default";
		document.getElementById(element).setAttribute("onclick", ";");
        
        mistakes++;
        var image = "{{url_for('static', filename='img/s" + mistakes + ".jpg')}}";
        document.getElementById("gallows").innerHTML = '<img src="' + image + '" alt="" />';

    }
    
    if(sentence == coveredSentence){
        document.getElementById("alphabet").innerHTML = "Odgadłeś hasło: " + sentence +
        '<br/<br/><span class="reset" onclick="location.reload()">Jeszcze Raz?</span>';
    }

    
    if(mistakes >= 9){
        document.getElementById("alphabet").innerHTML = "PRZEGRANA! Prawidłowe hasło: " + sentence +
        '<br/<br/><span class="reset" onclick="location.reload()">Jeszcze Raz?</span>';
    }
        
}
const BMIData = [
  { name: "Maigreur", color: "midnightblue", range: [0, 18.5] },
  { name: "Bonne santé", color: "green", range: [18.5, 25] },
  { name: "Surpoids", color: "lightcoral", range: [25, 30] },
  { name: "Obésité modérée", color: "orange", range: [30, 35] },
  { name: "Obésité sévère", color: "crimson", range: [35, 40] },
  { name: "Obésité morbide", color: "purple", range: 40 },
];



// IMC = poids en kg / taille² en m

const form = document.querySelector("form"); //On récupère tout ce qu'il y a dans la page : donc le formulaire
//console.log (typeof form); //Verif que c'est bien un objet dans la console : F12
//ou console.dir --> On a plus d'infos : propriétés, méthodes etc... de la form
form.addEventListener("submit", handleForm); //Ecoute de l'évènement
//submit --> nom de l'évènement qu'on a envie d'écouter
//handleForm -->  Méthode CallBack (Choix du nom à donner : ici : HandleForm. CallBack --> Rappel qu'une fonction sera exécuté)
//Lors de addEvenListener la méthode HandleForm sera exécuté : Rappelé par une autre fonction
function handleForm(e) { //Création de la fonction qui sera appelé
  e.preventDefault(); //On prévient le comportement par défault de l'envoi du formulaire

  calculateBMI(); //Fonction avec aucun paramètre
}

const inputs = document.querySelectorAll("input"); /*On selectionne plusieurs éléments --> les 2 input pour récupérer leurs valeurs*/

function calculateBMI() {
  const height = inputs[0].value; //Premier élément de la nodelist --> Récupération de la saisie du premier champ pour la taille de l'individu
  const weight = inputs[1].value; // Deuxième élément --> récupération du poids mis dans la variable const weight

  if (!height || !weight || height <= 0 || weight <= 0) { //Contrôle de saisie des champs avant de faire le  calcul
    handleError(); //Fonction qui retourne l'erreur
    return; //Arrêt du calcul
  }

  const BMI = (weight / Math.pow(height / 100, 2)).toFixed(1); //Formule du calcul de l'IMG --> /100² et .toFixed(1): 1seul chfffre après virgule
  console.log(BMI); // IMC = poids en kg / taille² en m . On divise par 100 pour mettre en cm (de m en cm --> zone de saisie en cm)

    showResult(BMI); //Fonction showResult
}

const displayBMI = document.querySelector(".bmi-value"); //Récupération du libellé --> 0 à l'initialisation
const result = document.querySelector(".result"); //Récupération du libellé qui affichera la sanction

function handleError() {
  displayBMI.textContent = "Wops"; //met dans libelle de bmi-value"
  displayBMI.style.color = "inherit"; //On remet la couleur à "0" grace à inherit
  result.textContent = "Remplissez correctement les inputs."; //met dans libelle de result et textContent : méthode dans JS
}

function showResult(BMI) {
  const rank = BMIData.find(data => { //.find --> méthode pour chercher dans le tableau
    if (BMI >= data.range[0] && BMI < data.range[1]) return data; //Fait la comparaison avec la tableau des 6 valeurs
    else if (typeof data.range === "number" && BMI >= data.range) return data;  //Pour dernière ligne --> Obésité morbide (>=40)
  });

  displayBMI.textContent = BMI; // résultat de la formule affiché            Le bactice : `${ }` --> entre crochet, on peut y mettre une expression JS
  displayBMI.style.color = `${rank.color}`; //Couleur de l'écriture selon le résultat dans tableau --> Bactice : alt gr + 7 (plus facile pour les variables et mettre le $)
  result.textContent = `Résultat : ${rank.name}`; //On affiche la sanction déclaré dans le tableau des 6 lignes de valeurs
}


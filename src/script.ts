class Personnage {

    nom: string;
    pointsVie: number;
    pointsAttaque: number;
    pointsDefense: number;

    constructor(nom: string, pointsVie: number, pointsAttaque: number, pointsDefense: number) {
        this.nom = nom;
        this.pointsVie = pointsVie;
        this.pointsAttaque = pointsAttaque;
        this.pointsDefense = pointsDefense;
    }


    joueur() {
        // Affiche les points de vie, d'attaque et de défense du personnage
    }

    boss() {
        //Affiche le nom, la vie, la force et la défense du boss
    }
}
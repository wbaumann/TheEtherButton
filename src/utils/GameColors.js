class GameColors {

    static getColor(blocksAwayFromDesiredBlock) {
        switch(blocksAwayFromDesiredBlock) {
            case 20:
            case 19:
                return "#1A237E";
            case 18:
            case 17:
                return "#0D47A1";
            case 16:
            case 15:
                return "#01579B";
            case 14:
            case 13:
                return "#006064";
            case 12:
            case 11:           
                return "#1B5E20";
            case 10:
            case 9:
                return "#F57F17";
            case 8:
            case 7:
                return "#FF6F00";
            case 6:
            case 5:
                return "#E65100";
            case 4:
                return "#BF360C";
            case 3:
                return "#B71C1C";
            case 2:
                return "#880E4F";
            case 1:
                return "#4A148C";
            case 0:
                return "#080808";
            default:
                return "#673AB7";
        }
    }

}

export default GameColors
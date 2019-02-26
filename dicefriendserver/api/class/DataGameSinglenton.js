/*
    2019-02-26 drincast
    Clase singleton para los datos generales del juego
*/
class DataGameSinglenton {
    constructor(){
        if(!DataGameSinglenton.instance){
            this.CreateInitProperties();
            DataGameSinglenton.instance = this;
        }

        return DataGameSinglenton.instance;
    }

    CreateInitProperties(){
        this.players = new Object([]);
        //this.players = [];
        this.numberPlayers = 0;
    }

    GetInstance(){
        if(!DataGameSinglenton.instance){
            this.CreateInitProperties();
            DataGameSinglenton.instance = this;
        }
        
        return DataGameSinglenton.instance;
    }

    GetMetaDataGame(){
        console.log('METADATA', DataGameSinglenton.instance);
    }

    GetPlayerXId(id){
        let player = this.players.find(item => id === item.id);
        return player;
    }

    AddPlayer(player){
        this.players.push(player);
        this.numberPlayers += 1;
    }

    RemovePlayer(player){        
        let index = this.players.findIndex(item => item.id === player)
        console.log('remove', player, index)
        //console.log('array ant', this.players);
        this.players.splice(index, 1);
        this.numberPlayers -= 1;
        //console.log('array desp', this.players);
    }
    
}

// const objDataSinglenton = new DataGameSinglenton();
// Object.freeze(objDataSinglenton);

//exports.default = objDataSinglenton;

module.exports = {
    DataGameSinglenton
    //objDataSinglenton
}


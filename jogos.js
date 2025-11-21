function Game()
        {
        var a,sorteio,chances=0
        var sorteio = Math.floor(Math.random()*500);
        while (true)
         
        {
        a = Number(window.prompt("Entre com um numero aleatório " ));
        chances++;
         console.log(sorteio);
       
         if  ( a==sorteio ) {
        alert("Acertou, parabens")
            break;
        }    
        else if (a<sorteio)
        {
          alert("O valor mágico é maior");
        }  
         else {
            alert("O valor mágico é menor");
         }
        }
        if ( chances > 10) {
        alert("voce é Lucas, tente novamente")
        ;}
        else if ( chances >=7 ){
            alert("voce é +-");
        }
        else if ( chances >=4 ) {
            alert("Voce tem sorte");
        }
        else  
        {
            alert("voce é foda")
        }
    }    

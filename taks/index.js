/**
 * # Task 1
 */

 const stringReverseMatch =(s1, s2)=>{

    if(typeof s1 !== "string" || typeof s2 !== "string") {
        throw "error";
    }
    let reverse = s2.split('').reverse().join('');

    return s1 === reverse;

 }

 /**
  * # Task 2
  */

 const findMaxNumber = (arr)=>{

    let max =  -Infinity;

    if( arr.length > 1){
        for(let i =1; i < arr.length; i++){
            if(arr[i] > max){
                max = arr[i];
            }
        }
    }

    return max;
 }
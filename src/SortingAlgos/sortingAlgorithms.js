export function getAnimations(array){
    const animation = [];
    if(array.length <= 1) return array;
    const auxArray = array.slice();
    mergeSort(array,0,array.length-1,auxArray,animation);
    console.log(array);
    return animation;
}

function mergeSort(mainArray, start, end,auxArray,animation){
    if (start===end)return;
    const mid = Math.floor((start + end) / 2);
    mergeSort(auxArray,start,mid,mainArray,animation);
    mergeSort(auxArray,mid+1,end,mainArray,animation);
    merge(mainArray,start,mid,end,auxArray,animation);
}


function merge(mainArray,start,mid,end,auxArray,animation){

    let leftIdx=start;
    let rightIdx=mid+1;
    let mainIdx=start;

    while(leftIdx<=mid && rightIdx<=end){

        //we are grabbing the two values that we are comparing
        //in order to highlight these values
        animation.push([leftIdx,rightIdx]);
        animation.push([leftIdx,rightIdx]);

        if(auxArray[leftIdx]<=auxArray[rightIdx]){
            animation.push([mainIdx, auxArray[leftIdx]]);
            mainArray[mainIdx++] = auxArray[leftIdx++];
        }else{
            animation.push([mainIdx, auxArray[rightIdx]]);
            mainArray[mainIdx++] = auxArray[rightIdx++];
        }
    }

    while(leftIdx<=mid){
        animation.push([leftIdx,leftIdx]);
        animation.push([leftIdx,leftIdx]);
        animation.push([mainIdx, auxArray[leftIdx]]);
        mainArray[mainIdx++] = auxArray[leftIdx++];
    }
    while(rightIdx<=end){
        animation.push([rightIdx,rightIdx]);
        animation.push([rightIdx,rightIdx]);
        animation.push([mainIdx, auxArray[rightIdx]]);
        mainArray[mainIdx++] = auxArray[rightIdx++];
    }

    
}

function swap(array,firstIdx,secondIdx,animations){
    animations.push([firstIdx,secondIdx]);
    animations.push([firstIdx,secondIdx]);
    var temp = array[firstIdx];
    array[firstIdx] = array[secondIdx];
    array[secondIdx] = temp;
    animations.push([firstIdx,array[firstIdx],secondIdx,array[secondIdx]]);
}

export function bubbleSort(array) {
    const animations = [];
    for(let i=0;i<array.length-1;i++){
        for(let j=0;j<array.length-i-1;j++){
            if(array[j]>array[j+1]){
                swap(array,j,j+1,animations);
            }else{
                
                animations.push([j,j+1]);
                animations.push([j,j+1]);
                animations.push([-1,-1,-1,-1]);
            }
        }
    }
    console.log(array);
    return animations;
}

export function quickSort(array, low, high){
    const animations = [];
    if (low < high){
        let pi = partition(array, low, high);
        quickSort(array,low, pi-1);
        quickSort(array,pi+1,high);
    }
    return animations;
}

function partition(array, low, high,animations){
    let pivot = array[high];
    let k = low-1;
    let i=low;
    for(i=low;i<=high;i++){
        animations.push([i,k]);
        animations.push([i,k]);
        if(array[i]<pivot){
            animations.push([k,array[k],i,array[i]]);
            k++;
            swap(array,i,k,animations);
        } else{
            animations.push([-1,-1,-1,-1]);
        }
    }
    animations.push([i,k]);
    animations.push([i,k]);
    animations.push([k,array[k],i,array[i]]);
    swap(array,k+1,high,animations);
    return k+1;
}

// export function insertionSort(array){
//     const animations = [];
//     let n = array.length;
//     let i, key, k;

//     for(i=1;i<n;i++){
//         key = array[i];
//         k=i-1;
//         while (k >= 0 && array[k] > key) {  
            
//             animations.push([i,k]);
//             animations.push([i,k]);
//             animations.push([k+1,array[k+1],k,array[k]]);
//             array[k + 1] = array[k];
//             k--;
//         }  
//         animations.push([i,k]);
//         animations.push([i,k]);
//         animations.push([k+1,array[k+1],key,array[key+1]]);
//         array[k + 1] = key;
//     }

//     return animations;
// }
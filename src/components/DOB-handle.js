
   //  Date 
    
export const getDOB = () => {
    const currentDate = new Date()
    const maxDOB = new Date (currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate())
    return maxDOB.toISOString().split('T')[0];
}

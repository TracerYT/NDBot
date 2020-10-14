module.exports = {
    sortRoles(cache, amount){
        const sortedRoles = cache.sorted((role1, role2) => role2.position - role1.position);
        return sortedRoles.first(amount);
    }
}
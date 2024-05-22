export default populateMW = function(next, path, fileds) {
    this.populate({
        path: path,
        select: fileds
    });

    next();
}
export const LIMIT = 10;

class APIFeatures {
  constructor(data, query) {
    this.data = data;
    this.query = query;
  }

  filter() {
    const queryOBJ = { ...this.query };
  
    const q = queryOBJ?.q;
    if (q) this.data = this.data.find(JSON.parse(q));
    else {
      const specialParams = ['sort', 'fields', 'page', 'limit'];
      specialParams.forEach((el) => delete queryOBJ[el]);
      //2 better query
      let querySTR = JSON.stringify(queryOBJ);
      querySTR = querySTR.replace(
        `/\b(gte|gt|lte|lt)\b/g`,
        (match) => `$${match}`
      );

      this.data = this.data.find(JSON.parse(querySTR));
    }

    //1 sub page, limit, sort, fields form query

    return this;
  }
  //sort

  sort() {
    if (this.query.sort) {
      const sortBy = this.query.sort.split(',').join(' ');
      this.data = this.data.sort(sortBy);
    } else {
      this.data = this.data.sort('-createAt');
    }

    return this;
  }
  //fields

  limitFields() {
    if (this.query.fields) {
      const fields = this.query.fields.split(',').join(' ');
      this.data = this.data.select(fields);
    } else {
      this.data = this.data.select('-__v');
    }

    return this;
  }
  //page

  paginate() {
    const page = this.query.page * 1 || 1;
    const limit = this.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    // if(this.query.page) {
    //   const numTuor= await tour.countDocuments();
    //   if(skip>= numTuor) throw new Error('This page not exist!');
    // }

    this.data = this.data.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;

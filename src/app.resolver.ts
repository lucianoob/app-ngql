import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';
import { Cat, CatInput } from './graphql';

@Resolver('Cat')
export class AppResolver {
  cats:Array<Cat> = [{
    id: 1,
    name: 'Cat1',
    age: 17
  }]

  @Mutation()
  createCat(
    @Args('cat')
    cat: CatInput
  ): Promise<string> {
    this.cats = [...this.cats, {...cat, id: this.cats.length + 1}];
    return Promise.resolve('cat created');
  }

  @Mutation()
  updateCat(
    @Args('cat')
    cat: CatInput
  ): Promise<string> {
    this.cats = this.cats.map(c => {
      if(c.id === cat.id) {
        return {...cat}
      }
      return c;
    });
    return Promise.resolve('cat updated');
  }

  @Mutation()
  deleteCat(
    @Args('id', ParseIntPipe)
    id: number
  ) : Promise<any> {
    this.cats = this.cats.filter(c => c.id !== id);
    return Promise.resolve('cat removed');
  }

  @Query()
  getCats(): Array<Cat> {
    return this.cats;
  }

  @Query('cat')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<Cat> {
    return this.cats.find(c => c.id === id);
  }

}
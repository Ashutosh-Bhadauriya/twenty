import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PipelineUpdateManyMutationInput } from './pipeline-update-many-mutation.input';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PipelineWhereInput } from './pipeline-where.input';

@ArgsType()
export class UpdateManyPipelineArgs {

    @Field(() => PipelineUpdateManyMutationInput, {nullable:false})
    @Type(() => PipelineUpdateManyMutationInput)
    @Type(() => PipelineUpdateManyMutationInput)
    @ValidateNested({each: true})
    data!: PipelineUpdateManyMutationInput;

    @Field(() => PipelineWhereInput, {nullable:true})
    @Type(() => PipelineWhereInput)
    where?: PipelineWhereInput;
}

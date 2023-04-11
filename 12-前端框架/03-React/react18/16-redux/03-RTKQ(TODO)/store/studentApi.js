import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

// 创建Api对象
//createApi() 用来创建RTKQ中的API对象
// RTKQ的所有功能都需要通过该对象来进行
// createApi() 需要一个对象作为参数
const studentApi = createApi({
    reducerPath: 'studentApi', // Api的标识，不能和其他的Api或reducer重复
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:1337/api/"
    }),// 指定查询的基础信息，发送请求使用的工具
    tagTypes: ['student'], // 用来指定Api中的标签类型
    endpoints(build) {
        // build是请求的构建器，通过build来设置请求的相关信息
        return {
            getStudents: build.query({
                query() {
                    // 用来指定请求子路径
                    return 'students';
                },
                // transformResponse 用来转换响应数据的格式
                transformResponse(baseQueryReturnValue, meta, arg) {
                    return baseQueryReturnValue.data;
                },

                providesTags: [{type: 'student', id: 'LIST'}]
            }),
            getStudentById: build.query({
                query(id) {
                    //http://localhost:1337/api/students/23
                    return `students/${id}`;
                },
                transformResponse(baseQueryReturnValue, meta, arg) {
                    return baseQueryReturnValue.data;
                },
                keepUnusedDataFor: 60, // 设置数据缓存的时间，单位秒 默认60s
                providesTags: (result, error, id) => [{type: 'student', id}]
            }),
            delStudent: build.mutation({
                query(id) {
                    //http://localhost:1337/api/students/4
                    return {
                        // 如果发送的get请求，需要返回一个对象来设置请求的信息
                        url: `students/${id}`,
                        method: 'delete'
                    };
                }
            }),
            addStudent: build.mutation({
                query(stu) {
                    return {
                        url: 'students',
                        method: 'post',
                        body: {data: stu}
                    };
                },
                invalidatesTags: [{type: 'student', id: 'LIST'}]
            }),
            updateStudent: build.mutation({
                query(stu) {
                    return {
                        url: `students/${stu.id}`,
                        method: 'put',
                        body: {data: stu.attributes}
                    };
                },
                invalidatesTags: ((result, error, stu) =>
                    [{type: 'student', id: stu.id}, {type: 'student', id: 'LIST'}])
            }),

        };
    }// endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值
});

// Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数
// 通过这些钩子函数，可以来向服务器发送请求
// 钩子函数的命名规则 getStudents --> useGetStudentsQuery
export const {
    useGetStudentsQuery,
    useGetStudentByIdQuery,
    useDelStudentMutation,
    useAddStudentMutation,
    useUpdateStudentMutation
} = studentApi;

export default studentApi;

import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/post/list',
        method: 'get',
        params: params
    })
}

export function fetchFocus(page,limit) {
    return request({
        url: `/index/${page}/${limit}`,
        method: 'get',
        params: {}
    })
}

export function fetchCategory() {
    return request({
        url: '/getTag',
        method: 'get',
        params: {}
    })
}

export function fetchFriend() {
    return request({
        url: '/friend',
        method: 'get',
        params: {}
    })
}

export function fetchSocial() {
    return request({
        url: '/social',
        method: 'get',
        params: {}
    });
}

export function fetchSiteInfo() {
    return request({
        url: '/site',
        method: 'get',
        params: {}
    })
}

export function fetchComment(blogId,page,limit) {
    // console.log("page:"+page+"=====limit:"+limit)
    return request({
        url: `/comment/${blogId}/${page}/${limit}`,
        method: 'get',
    })
}
export function article(id) {
    return request({
        url: '/article/'+id,
        method: 'get',
        params: {}
    })
}

export function category(typeId,page,limit) {
    return request({
        url: `/category/${typeId}/${page}/${limit}`,
        method: 'get',
        params: {}
    })
}
export function search(content,page,limit) {
    return request({
        url: `/search/${content}/${page}/${limit}`,
        method: 'get',
        params: {}
    })
}
export function getBlogById(tagId,page,limit) {
    return request({
        url: `/tag/${tagId}/${page}/${limit}`,
        method: 'get',
        params: {}
    })
}
export function countTagBlog() {
    return request({
        url: `/tag/top`,
        method: 'get',
        params: {}
    })
}
export function archived(query) {
    return request({
        url: `/archived`,
        method: 'post',
        data: query
    })
}
export function aboutMe(about) {
    return request({
        url: `/about`,
        method: 'post',
        data: about
    })
}
export function resume() {
    return request({
        url: `/about/resume`,
        method: 'get',
    })
}

export function commentOrReply(blogId,postComment) {
    return request({
        url: `/comment/reply/${blogId}`,
        method: 'post',
        data: postComment
    })
}

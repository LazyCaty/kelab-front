import React from 'react'
import marked from 'marked'
import highlight from 'highlight.js'
import {Link} from 'react-router-dom'
import {Form,Input,Icon,Button,message} from 'antd'
import ReactAce, {editorHandler} from './index'
import {connect} from 'react-redux'
import {addDocument} from '../../../redux/action/admin/docEditor'

import 'brace/mode/markdown'
import 'brace/theme/github'

require('./static/style/common.css')
require('./static/style/js-highlight.css')
require('./style.css')
highlight.configure({
  tabReplace: '  ',
  classPrefix: 'hljs-',
  languages: ['CSS', 'HTML, XML', 'JavaScript', 'PHP', 'Python', 'Stylus', 'TypeScript', 'Markdown']
})
marked.setOptions({
  highlight (code) {
    return highlight.highlightAuto(code).value
  }
})
@connect(state=>({
  docEditor:state.docEditor
})
)
 class EditorA extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      aceBoxH: null,
      previewContent: '',
      mytext: '',
      prewtext:''
    }
    this.cacheValue()
    this.onContentChange = this.onContentChange.bind(this)
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    let state = this.state
    return [
      <header className="edit-header" key='header'>
        <Form layout='inline' hideRequiredMark='true' >          
            <Form.Item label="ID" colon='true' >
                 {getFieldDecorator('doc_id', {
                        rules: [{ required: true, message: '请输入要添加的文档ID!' }],
                  })(
                     <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                             placeholder="ID" style={{width:"250px"}}/>
                  )}
            </Form.Item > 
            <Form.Item label="名称" colon='true'>
                  {getFieldDecorator('doc_name', {
                          rules: [{ required: true, message: '请输入要添加的文档名称!' }],
                  })(
                      <Input prefix={<Icon type="robot" style={{ color: 'rgba(0,0,0,.25)' }} />}
                              placeholder="名称" style={{width:"300px"}}/>
                  )}
            </Form.Item>
            <Form.Item label="简述" colon='true'>
                   {getFieldDecorator('doc_sketch', {
                          rules: [{ required: true, message: '请输入要添加的文档简述!' }],
                   })(
                          <Input prefix={<Icon type="solution" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="简述"  style={{width:"400px"}} />
                   )}
             </Form.Item>
              <Form.Item  >
                <Link to='/admin/document/'>
                            <Button type="primary" htmlType="submit" onClick={this.handleclick}> 
                                        确定
                             </Button>
                 </Link>
              </Form.Item>
              <Form.Item>
                   <Link to='/admin/document/'> 
                             <Button type="dashed" htmlType="submit"> 
                                    取消
                              </Button>
                    </Link>
              </Form.Item>
      </Form>
      </header>,
      <div className="editor-main-b" ref={node=>this.aceBox = node} style={{height: state.aceBoxH + 'px'}} key='main'>
        <div className="ace-tm common-container editor-container" onMouseOver={this.setCurrentIndex.bind(this, 1)} ref={node=>this.editContainer=node}>
          {
            state.aceBoxH &&
            <ReactAce
              value={this.state.mytext}
              mode="markdown"
              theme="github"
              wrapEnabled={true}
              tabSize={2}
              fontSize={14}
              showPrintMargin={false}
              showGutter={false}
              height={state.aceBoxH + 'px'}
              width={'100%'}
              debounceChangePeriod={60}
              onChange={this.onContentChange}
              onScroll={this.containerScroll.bind(this, 1)}
              name="aceEditorMain"
              editorProps={{$blockScrolling: false}}
            />
          }
          
        </div>                                                    
        <div className="common-container preview-container" ref={node=>this.previewContainer=node} onMouseOver={this.setCurrentIndex.bind(this, 2)} onScroll={this.containerScroll.bind(this, 2)}>
                                                           
           <div className="markdown-body preview-wrapper" ref={(node) =>  this.previewWrap = node }/> 
        </div>
      </div>
    ]
  }
  componentDidMount() {
    this.setState({
      aceBoxH: document.documentElement.clientHeight - document.querySelector('.edit-header').offsetHeight
    })
  }

  cacheValue() {
    this.currentTabIndex = 1
    this.hasContentChanged = false
    this.scale = 1
  }

  setCurrentIndex(index) {
    this.currentTabIndex = index
  }
  handleclick=()=>{
    const data=this.props.form.getFieldsValue();
    this.props.dispatch(addDocument({
      name:data.doc_name,
      docSubId:data.doc_id,
      markdownCode:this.state.mytext
    }))
    .then(()=>{
      console.log(this.props)
      // if(this.props.docEditor.adddoctext.code==='SUCCESS'){
      //   message.success('添加文档成功');
      //           setTimeout(()=>window.location.reload(),1000);
      // }
    })
  }
  containerScroll(index, e) {
    this.hasContentChanged && this.setScrollValue()
    if (this.currentTabIndex === 1 && index === 1) {
      this.previewContainer.scrollTop = e.renderer.getScrollTop() * this.scale
    } else if(this.currentTabIndex === 2 && index === 2) {
      editorHandler.getSession().setScrollTop(this.previewContainer.scrollTop / this.scale)
    }
  }
  onContentChange=(value)=> {
    this.setState({
      mytext:value
    })
    this.previewWrap.innerHTML = marked(value)
   !this.hasContentChanged && (this.hasContentChanged = true)
  }

  setScrollValue() {
    // 设置值，方便 scrollBy 操作
    this.scale = (this.previewWrap.offsetHeight - this.previewContainer.offsetHeight) / (editorHandler.getSession().getScreenLength()*editorHandler.renderer.lineHeight - this.state.aceBoxH)
    this.hasContentChanged = false
  }
}
export default Form.create()(EditorA);
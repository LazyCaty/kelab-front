// 编辑器
import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import Markdown from 'braft-extensions/dist/markdown'
import { ContentUtils } from 'braft-utils'
import { Button} from 'antd'
import {getServerDoc} from '../../redux/action/admin/brafEditors'
import { connect } from 'react-redux';

const MarkdownOptions = {
  
};
BraftEditor.use(Markdown(MarkdownOptions))
@connect(state=>({
  
}))
class EditorDemo extends React.Component {

    constructor(props){
        super(props); 
       this.state = {
        editorState: BraftEditor.createEditorState(props.value || null) // 接收数据
    }
    }


    async componentDidMount () {

        // 假设此处从服务端获取html格式的编辑器内容
        // this.props.dispatch(getServerDoc({serverid:1} )).then(()=>{

        // })
        
        //const htmlContent = await fetchEditorContent()
        // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorState数据
        this.setState({
            editorState: BraftEditor.createEditorState("<h1>ff</h1>")
        })
      // console.log("props:"+this.props.match.params.data);
    }
    //清空编辑器
    clearContent = () => {
        this.setState({
          editorState: ContentUtils.clear(this.state.editorState)
        })
      }
    //添加自定义文本
      insertText = () => {
        this.setState({
          editorState: ContentUtils.insertText(this.state.editorState, 'Hello World!')
        })
      }

    submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const MarkdownOptions = {
        };
        BraftEditor.use(Markdown(MarkdownOptions));
        const htmlContent = this.state.editorState.toHTML()
        //const result = await saveEditorContent(htmlContent)
        console.log(htmlContent);
    }

    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }
    preview = () => {
        if (window.previewWindow) {
            window.previewWindow.close();
        }
        window.previewWindow = window.open();
        window.previewWindow.document.write(this.buildPreviewHtml());
        window.previewWindow.document.close();
    };
    lookGrammer=()=>{
      
    }

    buildPreviewHtml() {
        return `
      <!Doctype html>
      <html>
        <head>
          <title>预览</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${this.state.editorState.toHTML()}</div>
        </body>
      </html>
    `;}

    render () {

        const { editorState } = this.state
        const extendControls = [
            {
              key: 'clear-editor',
              type: 'button',
              text: '清空编辑器',
              onClick: this.clearContent
            },  {
                key: 'preview',
                type: 'button',
                text: '预览',
                onClick: this.preview,
            },{
                key: 'markdown',
                type: 'button',
                text: '查看Markdown 语法',
              onClick: this.lookGrammer,
            }
          ]
        return (
            <div className="my-component">
                <BraftEditor
                    value={editorState}
                    onChange={this.handleEditorChange}
                    onSave={this.submitContent}
                    extendControls={extendControls}
                />
          
            </div>
            
        )

    }

}
export default EditorDemo;
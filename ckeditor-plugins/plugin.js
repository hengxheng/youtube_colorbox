CKEDITOR.plugins.add( 'youtube_video',
{
  init: function( editor )
  {
    /* COMMAND */
    editor.addCommand( 'cmdUVideoDialog', new CKEDITOR.dialogCommand( 'UVideoDialog' ) );
    
    /* BUTTON */
    editor.ui.addButton( 'youtube_video',
    {
      label: 'Insert Youtube Video',
      command: 'cmdUVideoDialog',
      icon: this.path + 'button.png'
    } );

    /* DIALOG */
    CKEDITOR.dialog.add( 'UVideoDialog', function ( editor )
    {
      return {
        title : 'Insert Youtube Video',
        minWidth : 300,
        minHeight : 200,
        contents :
        [{
          id : 'tab1',
          label : 'Settings',
          elements :
          [{
            type : 'text',
            id : 'id',
            label : 'Youtube Video ID',
            validate : CKEDITOR.dialog.validate.notEmpty( "Youtube Video ID should be provided" )
          }, 
          {
            type : 'text',
            id : 'width',
            label : 'Width',
            validate : CKEDITOR.dialog.validate.notEmpty( "Video width should be provided" )
          }, 
          {
            type : 'text',
            id : 'height',
            label : 'Height',
            validate : CKEDITOR.dialog.validate.notEmpty( "Video height should be provided" )
          } 
          ]
        }],
        onOk : function()
               {
                 var dialog = this;
                 var vid = dialog.getValueOf( 'tab1', 'id' );
                 var vwidth = dialog.getValueOf( 'tab1', 'width' );
                 var vheight = dialog.getValueOf( 'tab1', 'height' );
                 var content = '<a class="colorbox-load" href="http://www.youtube.com/v/'+vid+
                 '?fs=1&amp;width='+vwidth+'&amp;height='+vheight+
                 '&amp;hl=en_US1&amp;iframe=true&amp;rel=0"><img src="http://img.youtube.com/vi/'
                 +vid+'/1.jpg" width="305" height="200"/></a>';
                 var openTag = '';
                 var closeTag = '';
                 var inplaceTag = ' ' + openTag + content + closeTag + ' ';

                 var S = editor.getSelection();
                 console.log(S);

                 if( S == null)
                 {
                   editor.insertHtml(inplaceTag);
                   return;
                 }

                 var R = S.getRanges();
                 R = R[0];
      
                 if( R == null)
                 {
                   editor.insertHtml(inplaceTag);
                   return;
                 }


                 var startPos = Math.min(R.startOffset, R.endOffset);
                 var endPos = Math.max(R.startOffset, R.endOffset);
                  
                 //console.log(R);
                 if( startPos == endPos )
                 {
                   editor.insertHtml(inplaceTag);
                   return;
                 }

                 var container = new CKEDITOR.dom.element('p');
                 var fragment = R.extractContents();
                  
                 container.appendText(openTag);                  
                 fragment.appendTo(container);  
                 container.appendText(closeTag);

                 editor.insertElement(container);
               }
      };
    });//dialog.add
  }//init:
});//plugin.add

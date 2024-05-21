class JsonEditor {
    constructor(elementId) {
        this.editor = ace.edit(elementId);
        this.editor.setTheme("ace/theme/monokai");
        this.editor.session.setMode("ace/mode/json");
        this.systemEdit = false;

        this.editor.session.on('change', (evt) => {
            var content = this.editor.getValue();
            var cleanedText = content.replace(/\[\^\d+\^\]\[\d+\]/g, '');
            if (content !== cleanedText) {
                var cursorPosition = this.editor.getCursorPosition();
                this.editor.setValue(cleanedText, -1);
                this.editor.moveCursorToPosition(cursorPosition);
            }
        });
    }

    getValue() {
        return this.editor.getValue();
    }

    setValue(value) {
        this.editor.setValue(value);
    }

    setReadOnly(readOnly) {
        this.editor.setReadOnly(readOnly);
    }
}


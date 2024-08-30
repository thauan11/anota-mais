import React, { useState } from "react";
import { saveAs } from "file-saver";

const FileUploader = () => {
  const [fileContent, setFileContent] = useState("");

  // Função para lidar com o upload do arquivo
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          // Tenta fazer o parse do conteúdo como JSON
          const jsonContent = JSON.parse(e.target.result);
          setFileContent(JSON.stringify(jsonContent, null, 2)); // Formata o JSON para exibição
        } catch (error) {
          alert("O conteúdo do arquivo não é um JSON válido.");
        }
      };
      reader.readAsText(file);
    } else {
      alert("Por favor, selecione um arquivo .txt válido.");
    }
  };

  // Função para salvar o conteúdo como arquivo JSON
  const handleFileDownload = () => {
    const blob = new Blob([fileContent], { type: "application/json" });
    saveAs(blob, "arquivo.json");
  };

  return (
    <div>
      <h2>Upload de Arquivo .txt contendo JSON</h2>
      <input type="file" accept=".txt" onChange={handleFileUpload} />
      {fileContent && (
        <div>
          <h3>Conteúdo do JSON:</h3>
          <pre>{fileContent}</pre>
          <button onClick={handleFileDownload}>Baixar como JSON</button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;

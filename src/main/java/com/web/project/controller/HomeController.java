package com.web.project.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.web.project.dto.Test;
import com.web.project.dto.Upload;
import com.web.project.repository.Repository;
import com.web.project.utils.MediaTypeUtils;

@Controller
public class HomeController {

	@Autowired
	private Repository repository;

	private final String directory = "/home/romantic-coder/file";
	private final String fileName = "project pic 3.png";

	@Autowired
	private ServletContext servletContext;

	String viewPage = "";

	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String showCreateAdsTest(Model model) {
		viewPage = "test";
		model.addAttribute("test", new Test());
		return viewPage;
	}

	@RequestMapping(value = "/test", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String submitCreateAdsTest(@RequestBody Test test, Model model) {
		try {
			return addTest(test);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return null;
	}

	@SuppressWarnings("unused")
	public String addTest(Test test) throws JSONException {
		JSONObject jsonObject = new JSONObject();
		System.out.println("Get Model: " + test.getModel() + " Engine of Type: " + test.getTypeOfEngine());
		if (test == null) {
			jsonObject.put("message", "Put value in database!");
		} else {
			// repository.save(test);
			System.out.println(test.toString());
			jsonObject.put("message", "call from ajax!!!");
		}
		return jsonObject.toString();
	}

	@RequestMapping(value = "/mine", method = RequestMethod.GET)
	public String showTest(Model model) {
		viewPage = "my";
		model.addAttribute("test", new Test());
		return viewPage;
	}

	@RequestMapping(value = "/mine", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String submitTest(@RequestBody Test test, Model model) {
		try {
			System.out.println("Get Brand: " + test.getBrand());
			return addTest(test);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/file", method = RequestMethod.GET)
	public String showFile(Model model) {
		viewPage = "file";
		model.addAttribute("file", new Upload());
		return viewPage;
	}

	@RequestMapping(value = "/file", method = RequestMethod.POST)
	public String submitFile(HttpServletRequest request, @ModelAttribute("file") Upload file, BindingResult result,
			Model model) {
		return this.doUpload(request, model, file);
	}

	private String doUpload(HttpServletRequest request, Model model, Upload file) {
		String name = file.getName();
		String email = file.getEmail();
		String phone = file.getPhone();

		System.out.println("Name: " + name + ", Email: " + email + ", Phone: " + phone);

		String uploadFilePath = "/home/romantic-coder/file";
		System.out.println("The file save at: " + uploadFilePath);

		File uploadDir = new File(uploadFilePath);

		if (!uploadDir.exists()) {
			uploadDir.mkdirs();
		}

		MultipartFile fileData = file.getFile();

		List<File> uploadedFiles = new ArrayList<File>();

		List<String> failedFiles = new ArrayList<String>();

		String fileName = fileData.getOriginalFilename();
		System.out.println("Client File name: " + fileName);

		if (fileName != null && name.length() > 0) {
			try {
				File serverFile = new File(uploadDir.getAbsolutePath() + File.separator + fileName);
				BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
				stream.write(fileData.getBytes());
				stream.close();

				uploadedFiles.add(serverFile);
				System.out.println("Write file: " + fileName);
			} catch (Exception e) {
				System.out.println("Error write file: " + fileName);
				failedFiles.add(fileName);
			}
		}
		model.addAttribute("name", name);
		model.addAttribute("email", email);
		model.addAttribute("phone", phone);
		model.addAttribute("uploadedFile", uploadedFiles);
		model.addAttribute("failedFile", failedFiles);
		return "success";
	}

	@RequestMapping("/download1")
	public ResponseEntity<InputStreamResource> downloadFile(@RequestParam(name = fileName) String fileName)
			throws FileNotFoundException {
		MediaType mediaType = MediaTypeUtils.getMediaTypeForFileName(this.servletContext, fileName);
		System.out.println("FileName: " + fileName);
		System.out.println("MediaType: " + mediaType);

		File file = new File(directory + File.separator + fileName);
		InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + file.getName())
				.contentType(mediaType).contentLength(file.length()).body(resource);
	}
}

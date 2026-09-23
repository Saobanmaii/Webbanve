package com.kiettran.webbanve.service.impl;

import com.kiettran.webbanve.dto.cinema.CinemaRequestDto;
import com.kiettran.webbanve.dto.cinema.CinemaResponseDto;
import com.kiettran.webbanve.dto.cinema.CinemaUpdateDto;
import com.kiettran.webbanve.entity.Cinema;
import com.kiettran.webbanve.exception.ResourceNotFoundException;
import com.kiettran.webbanve.mapper.CinemaMapper;
import com.kiettran.webbanve.repository.CinemaRepository;
import com.kiettran.webbanve.service.CinemaService;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CinemaServiceImpl implements CinemaService {
    private final CinemaRepository cinemaRepository;
    private final CinemaMapper cinemaMapper;
    private final MessageSource messageSource;

    public CinemaServiceImpl(CinemaRepository cinemaRepository, CinemaMapper cinemaMapper, MessageSource messageSource) {
        this.cinemaRepository = cinemaRepository;
        this.cinemaMapper = cinemaMapper;
        this.messageSource = messageSource;
    }
    @Transactional(readOnly = true)
    @Override
    public CinemaResponseDto getById(Long id){
        Cinema cinema = cinemaRepository.findById(id).orElseThrow(()->new ResourceNotFoundException(messageSource.getMessage("cinema.notfound", null, LocaleContextHolder.getLocale())));
        return cinemaMapper.entityToDto(cinema);
    }

    @Transactional(readOnly = true)
    @Override
    public Page<CinemaResponseDto> getAll(Pageable pageable){
        return cinemaRepository.findAll(pageable).map(cinemaMapper::entityToDto);
    }

    @Transactional
    @Override
    public CinemaResponseDto create(CinemaRequestDto cinema){
        return cinemaMapper.entityToDto(cinemaRepository.save(cinemaMapper.dtoToEntity(cinema)));
    }

    @Transactional
    @Override
    public CinemaResponseDto update(Long id, CinemaUpdateDto dto){
        Cinema cinemaBefore = cinemaRepository.findById(id).orElseThrow(()->new ResourceNotFoundException(messageSource.getMessage("cinema.notfound", null, LocaleContextHolder.getLocale())));
        if(dto.getName() != null) cinemaBefore.setName(dto.getName());
        if(dto.getAddress() != null) cinemaBefore.setAddress(dto.getAddress());
        return cinemaMapper.entityToDto(cinemaRepository.save(cinemaBefore));
    }

    @Transactional
    @Override
    public void delete(Long id){
        cinemaRepository.findById(id).orElseThrow(()->new ResourceNotFoundException(messageSource.getMessage("cinema.notfound", null, LocaleContextHolder.getLocale())));
        cinemaRepository.deleteById(id);
    }
}
